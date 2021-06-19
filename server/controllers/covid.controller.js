const Covid = require ('../models/Covid.model');

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