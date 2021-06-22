const Covid = require ('../models/Covid.model');
const jwt = require('jsonwebtoken');

// module.exports = { 
//     //get ALL Covid documents from Mongo
//     getAll: (req, res) => {
//         Covid.find( { } )
//         .populate("createdByUser", "username")
//         .then ((allCovid) => {
//             console.log("In getAll");
//         res.json(allCovid);
//         })
//         .catch((err) => {
//             console.log("Error within getAll");
//             res.status(500).json(err);
//         })
//     },
//     // get one Covid document
//     getOne: (req, res) => {
//         console.log("getOne ID: " + req.params.id);
//         Covid.findById(req.params.id)
//             .populate("createdByUser", "username")
//             .then((oneCovid) => {
//                 console.log("In getOne");
//                 res.json(oneCovid);
//             }) 
//             .catch((err) => {
//                 console.log("Error within getOne");
//                 res.status(500).json(err);
//             })
//     },
//     // create a Covid document
//     create: (req, res) => {
//         console.log(req.body);  // this will print the json object we want to add to the DB
//         const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
//         const userId = decodedJwt.payload.user_id;
    
//         // create the normal covid object from what was passed in
//         const covid = new Covid(req.body);
    
//         // now add the new createdBy key in the object and give it the value of this User's ID
//         //    that was stored in our encoded cookie
//         covid.createdByUser = userId;
    
//         res.json(covid);
    
//         Covid.create(covid)
        
//             .then((newCovid) => {
//                 console.log("In Create");
//                 res.json(newCovid);
//             })
//             .catch((err) => {
//                 console.log("Error in create");
//                 res.status(500).json(err);
//             })
//         },
    
//       // update a covid document
//       // almost identical to the Create
//         update: (req, res) => {
//             console.log(req.body);  // this will print the json object we want to add to the DB
//             Covid.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,            // by default mongoose will return the object as it was BEFORE you updated it
//             runValidators: true,  // by default Mongoose models do NOT validate data on updates
//             })
//             .then((updatedCovid) => {
//                 console.log("In Update");
//                 res.json(updatedCovid);
//             })
//             .catch((err) => {
//                 console.log("Error in update");
//                 res.status(500).json(err);
//             })
        
//         },
//         // delete a covid document
//         delete: (req, res) => {
//             console.log("delete ID: " + req.params.id);
//             // current user that is trying to delete a covid
//             const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
//             const userId = decodedJwt.payload.user_id;
        
//             Covid.findById(req.params.id)
//             .then((currentCovid) => {
//                 if(currentCovid === null) {
//                 res.json({ msg: "document does not exist"})
//                 }
//                 else {
//                 console.log("created by user: " + currentCovid.createdByUser);
//                 console.log("logged in user: " + userId);
        
//                 // object IDs in the document are NOT strings by default!
//                 if(currentCovid.createdByUser.toString() === userId) {
//                     // this user is allowed to delete the covid
//                     Covid.findByIdAndDelete(req.params.id)
//                     .then((deletedCovid) => {
//                         console.log("In Delete");
//                         res.json(deletedCovid);
//                     })
//                     .catch((err) => {
//                         console.log("Error in delete");
//                         res.status(500).json(err);
//                     });
//                 } else {
//                     res.status(403).json({msg: "You are not allowed to delete someone elses covid!"})
//                 }
//                 }
//             })
//             .catch((err) => {
//                 console.log("Delete error caught")
//                 console.log(err);
//                 res.json(err);
//             })
//         }
    
//     }
    

module.exports = { 
    //get ALL Covid documents from Mongo
    getAll: (req, res) => {
        Covid.find( { } )
        .then ((allCovid) => {
            console.log("In getAll");
        res.json(allCovid);
        })
        .catch((err) => {
            console.log("Error within getAll");
            res.status(500).json(err);
        })
    },
    // get one Covid document
    getOne: (req, res) => {
        console.log("getOne ID: " + req.params.id);
        Covid.findById(req.params.id)
            .then((oneCovid) => {
                console.log("In getOne");
                res.json(oneCovid);
            }) 
            .catch((err) => {
                console.log("Error within getOne");
                res.status(500).json(err);
            })
    },
    // create a Covid document
    create: (req, res) => {
        console.log(req.body); //this will print the json object that we want to add to the DB
        Covid.create(req.body)
            .then((newCovid) => {
                console.log("In Create");
                res.json(newCovid);
            })
            .catch((err) => {
                console.log("Error within create");
                res.status(500).json(err);
            })
    },
    // update Covid document
    update: (req, res) => {
        console.log(req.body); //this will print the json object that we want to add to the DB
        Covid.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true, //validators do not work by default, need to set to True
        })
            .then((updatedCovid) => {
                console.log("In Update");
                res.json(updatedCovid);
            })
            .catch((err) => {
                console.log("Error within update");
                res.status(500).json(err);
            })
    },
    // delete Covid document
    delete: (req, res) => {
        console.log("delete ID: " + req.params.id);
        Covid.findByIdAndDelete(req.params.id)
            .then((deletedHero) => {
                console.log("In delete");
                res.json(deletedHero);
            }) 
            .catch((err) => {
                console.log("Error within delete");
                res.status(500).json(err);
            });
    }
}