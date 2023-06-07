const mongoose= require('mongoose');
const recruiterSchema = new mongoose.Schema({
    // ask companyName at the time of registration
    companyName: {
        type: String,
        required: true,
        minLength: 3
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
        unique: true,
        minLength: 5
    },
    recruiterName:{
        type:String,
        required: true,
    },
    // password to be asked at the time of registration
    password:{
        type:String,
        required: true
    },
    companySize:{
        type:String,
    },
    description:{
        type: String,
        maxlength: 300
    },
    website: String
})
const Recruiter = mongoose.model("recruiter",recruiterSchema);
module.exports = Recruiter;