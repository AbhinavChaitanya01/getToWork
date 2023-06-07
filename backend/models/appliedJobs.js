const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    applicantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobseeker',
    },
    recruiterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter'
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'createdJob'
    },
    companyName:{
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: [
          "applied", // when a applicant is applied
          "shortlisted", // when a applicant is shortlisted
          "accepted", // when a applicant is accepted
          "rejected", // when a applicant is rejected
          "deleted", // when any job is deleted
        ],
        default: "applied",
        required: true,
    },
    dateOfApplication: {
        type: Date,
        default: Date.now,
    },
    // shall contain drive-link or any other link that the applicant finds suitable
    resume: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('appliedJob',applicationSchema);