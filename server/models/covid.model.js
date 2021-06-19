const mongoose = require('mongoose');

const CovidSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "This is a required field."],
    }, 
    lastName: {
        type: String,
        required: [true, "This is a required field."],
    }, 
    Address: {
        type: String,
        required: [true, "This is a required field!"]
    },
    DateOfBirth: {
        type: Date, 
        // new date means today 
        max: [new Date(), "Your DOB cannot be today."],
    },
    PhoneNumber: {
        type: String,
        required: [true, "This is a required field!"]
    },
    EssentialWorker: {
        type: Boolean,
        default: true
    },
    DescribeEssentialWork: {
        type: String,
        enum: [
            'Military',
            'Healthcare Worker',
            'Resturant Worker'
        ],
    },
    Disablity: {
        type: Boolean,
        default: true
    },
}, 
{timestamps:true});

//create the model using the name of my collection and the Schema
const Covid = mongoose.model("Covid", CovidSchema);
module.exports = Covid;
