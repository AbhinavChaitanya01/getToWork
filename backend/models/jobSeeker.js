const mongoose = require('mongoose');
const seekerSchema = new mongoose.Schema({
    // full name of job seeker : to be asked at time of registration and obviously not unique
    fullname: {
        type: String,
        required: true
    },

    // unique email to be asked for at time of registration
    email: {
        type: String,
        required: true,
        unique: true
    },

    // unique username to be aksed for at the time of registration 
    username: {
        type: String,
        required: true,
        unique: true
    },

    // password to be asked at the time of registration
    password:{
        type:String,
        required: true
    },
    education: String,

    // skillset of the job-seeker
    skills: [{ type: String}],

    experienceYrs : Number,

    // About of the job-seeker : Constraint 300 characters
    about:{
        type: String,
        maxLength: 300
    },

    // google-drive resume link
    resume: String,

    // other connect-links
    connectionSites : String 
})

const Seeker = mongoose.model("jobseeker",seekerSchema);
module.exports = Seeker;