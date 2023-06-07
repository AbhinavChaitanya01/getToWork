const mongoose = require('mongoose');
const createdSchema = new mongoose.Schema({
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter',
    },
    // compulsory: (Eg SDE, UI-UX Designer)
    role: {
        type: String, 
        required: true
    },
    companyName:{
        type:String,
        required:true
    },
    // compulsory: (Eg permanent(full-time), Adhoc, intern)
    jobType:{
        type: String,
        required: true,
    },

    // compulsory: (Eg remote, onsite, hybrid)
    nature: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        min:0
    },    
    duration:{
        type: String,
    },

    skillsets: [{type: String}],

    deadline:{
        type: Date,
    },

    dateOfPosting: {
        type: Date,
        default: Date.now,
    },
    numberOfPositions:Number,

    description:{
        type: String
    },

    location:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('createdJob',createdSchema);