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
    address: {
        type: String,
        required: [true, "This is a required field!"]
    },
    dateOfBirth: {
        type: Date, 
        // new date means today 
        max: [new Date(), "Your DOB cannot be today."],
    },
    phoneNumber: {
        type: String,
        required: [true, "This is a required field!"]
    },
    essentialWorker: {
        type: Boolean,
        default: true
    },
    describeEssentialWork: {
        type: String,
        enum: [
            'Military',
            'Healthcare Worker',
            'Resturant Worker'
        ],
    },
    disability: {
        type: Boolean,
        default: true
    },
}, 
{timestamps:true});

//create the model using the name of my collection and the Schema
const Covid = mongoose.model("Covid", CovidSchema);
module.exports = Covid;
