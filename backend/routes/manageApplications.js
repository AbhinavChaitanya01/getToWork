const express = require('express');
const Recruiter = require('../models/recruiter');
const Seeker = require('../models/jobSeeker');
const Jobs= require('../models/createdJobs');
const Applications = require('../models/appliedJobs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

var fetchrecruiter = require("../middleware/fetchRecruiter");
var fetchseeker = require("../middleware/fetchSeeker");

// ROUTE 1: Apply for a job using:  POST: "/api/manageapplications/apply/:id"
router.post("/apply/:id",fetchseeker,async(req,res)=>{
    const jobID=req.params.id;
    let job= await Jobs.findById(jobID);
    if(!job)return res.status(404).send(" This job does not exist");
    if(!req.seeker)return res.status(401).send("Sorry, you can't apply here");
    let applied= await Applications.findOne({applicantId : req.seeker.id , jobId : jobID});
    if(applied)return res.status(400).send("You have already applied once");
    const newApplication={};
    if(req.body.resume){
        newApplication.resume= req.body.resume;
    }
    newApplication.applicantId=req.seeker.id;
    newApplication.jobId= jobID;
    newApplication.companyName = job.companyName;
    newApplication.recruiterId=job.recruiter;
    try{
        const savedApplication = new Applications(newApplication);
        const appl= await savedApplication.save();
        res.json(appl);
    }catch(error){
        res.status(500).send("internal server error");
    }
}) 

// ROUTE-2 : fetch all jobs that jobseeker has applied for
// login required
// using : GET :"/api/manageapplications/fetchmyjobs"

router.get("/fetchmyjobs",fetchseeker,async(req,res)=>{
    if(!req.seeker)return res.status(401).send("Access Denied");
    try{
        const applications = await Applications.find({applicantId: req.seeker.id});
        res.json(applications);
    }catch(error){
        res.status(500).send("internal server error");
    }
})


// ROUTE-3 : Fetch recruiter details from jobId - companyName, email, recruiterName, companySize , description, website
// using : GET :"/api/manageapplications/getrecruiterdetails/:id"

router.get("/getrecruiterdetails/:id",fetchseeker,async(req,res)=>{
    try{
        if(!req.seeker)return res.status(401).send("Access Denied");
    const jobID=req.params.id;
    let job= await Jobs.findById(jobID);
    if(!job)return res.status(404).send("This job does not exist");
    const postedBy = await Recruiter.findById(job.recruiter);
    const details={};
    details.companyName = postedBy.companyName;
    details.recruiterName = postedBy.recruiterName;
    details.email = postedBy.email;
    if(postedBy.companySize){
        details.companySize = postedBy.companySize;
    }
    if(postedBy.description){
        details.description = postedBy.description;
    }
    if(postedBy.website){
        details.website = postedBy.website;
    }
    res.json(details);
    }catch(error){
        res.status(500).send("internal server error");
    }
})

// ROUTE-4 : Fetch all applications for a jobId - resume
// GET: "/api/manageapplications/fetchallapplications/:id"
 
router.get("/fetchallapplications/:id",fetchrecruiter,async(req,res)=>{
    if(!req.recruiter)return res.status(401).send("Access Denied");
    try{
        const applications = await Applications.find({recruiterId: req.recruiter.id,jobId:req.params.id});
        res.json(applications);
    }catch(error){
        res.status(500).send("internal server error");
    }
})

// ROUTE 5: Update applicant status to 
// "shortlisted", // when a applicant is shortlisted
// "accepted", // when a applicant is accepted
// "rejected", // when a applicant is rejected
// "deleted", // when any job is deleted
// using : PUT : "/api/manageapplications/updatestatus/:id"

router.put("/updatestatus/:id",fetchrecruiter,[
    body('status').isLength({min:1})
],async(req,res)=>{
    if(!req.recruiter)return res.status(401).send("Access Denied");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try{
        let application = await Applications.findById(req.params.id);

        if(!application)return res.status(404).send("Not found application");
        if(application.recruiterId.toString()!=req.recruiter.id)return res.status(401).send("Not allowed");
        let editApplication = {};
        editApplication.status = req.body.status;
        application = await Applications.findByIdAndUpdate(req.params.id,{$set:editApplication},{new: true});
        res.json(application);
        
    }catch(error){
        res.status(500).send("internal server error");
    }
})

// ROUTE 6: Job seekers Update Job application - resume 
// using PUT : "/api/manageapplications/updateapplication/:id"

router.put("/updateapplication/:id",fetchseeker,body('resume').isLength({min:1}),async (req,res)=>{
    if(!req.seeker)return res.status(401).send("Access Denied");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{
        let application = await Applications.findById(req.params.id);

        if(!application)return res.status(404).send("Not found application");

        if(application.applicantId.toString()!=req.seeker.id)return res.status(401).send("Not allowed");
        let editApplication = {};
        editApplication.status = req.body.status;
        application = await Applications.findByIdAndUpdate(req.params.id,{$set:editApplication},{new: true});
        res.json(application);
        
    }catch(error){
        res.status(500).send("internal server error");
    }
})

// ROUTE 7: Job seeker withdraws application using : DELETE "/api/manageapplications/withdrawapplication/:id"
router.delete("/withdrawapplication/:id",fetchseeker,async (req,res)=>{
    if(!req.seeker)return res.status(401).send("Access Denied");
    try{
        let application = await Applications.findById(req.params.id);
        if(!application)return res.status(404).send("Not found");
        if(application.applicantId.toString()!==req.seeker.id){
            return res.status(401).send("Not Allowed");
        }
        application = await Applications.findByIdAndDelete(req.params.id);
        res.json({Success:"Application withdrawn"});
    }catch(error){
        res.status(500).send("internal server error")
    }
})

module.exports = router;