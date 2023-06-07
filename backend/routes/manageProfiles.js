const express = require('express');
const Recruiter = require('../models/recruiter');
const Seeker = require('../models/jobSeeker');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

var fetchrecruiter = require("../middleware/fetchRecruiter");
var fetchseeker = require("../middleware/fetchSeeker");

// ROUTE 1: view recruiter profile
// using GET: "/api/manageprofiles/fetchrecruiterprofile/:id"

router.get("/fetchrecruiterprofile/:id",async(req,res)=>{
    try {
        let recruiter = await Recruiter.findById(req.params.id);
        if(!recruiter){
            return res.status(404).send("Not found!");
        }
        else{
            res.json(recruiter);
        }
    } catch (error) {
        
        res.status(500).send("internal server error");
    }
})

// ROUTE 2: view job-seekers profile
// using GET : "/api/manageprofiles/fetchjobseekerprofile/:id"

router.get("/fetchjobseekerprofile/:id",async(req,res)=>{
    try {
        let seeker = await Seeker.findById(req.params.id);
        if(!seeker){
            return res.status(404).send("Not found!");
        }
        else{
            res.json(seeker);
        }
    } catch (error) {
        
        res.status(500).send("internal server error");
    }
})

// ROUTE 3: Recruiter updates his profile: using PUT : "/api/manageprofiles/updaterecruiterprofile/:id"

router.put("/updaterecruiterprofile/:id",fetchrecruiter,[
    body('description',"description not more than 300 characters").isLength({max:300})
], async(req,res)=>{
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    const editProfile ={};
    if(req.body.companyName){
        editProfile.companyName=req.body.companyName;
    }
    if(req.body.username){
        editProfile.username=req.body.username;
    }
    if(req.body.recruiterName){
        editProfile.recruiterName=req.body.recruiterName;
    }
    if(req.body.companySize){
        editProfile.companySize=req.body.companySize;
    }
    if(req.body.description){
        editProfile.description=req.body.description;
    }
    if(req.body.website){
        editProfile.website=req.body.website;
    }
    let official = await Recruiter.findById(req.params.id);
    if(!req.recruiter)return res.status(401).send("Not Allowed here");
    if(req.params.id!==req.recruiter.id){
        return res.status(401).send("Not Allowed");
    }
    else official = await Recruiter.findByIdAndUpdate(req.params.id,{$set:editProfile},{new:true});
    res.json(official);
})

// ROUTE 4: Job-seeker updates his profile :using PUT : "/api/manageprofiles/updatejobseekerprofile/:id"
router.put("/updatejobseekerprofile/:id",fetchseeker,[
    body('about',"description not more than 300 characters").isLength({max:300}),
    body('experienceYrs').isNumeric()
], async(req,res)=>{
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    const editProfile ={};
    if(req.body.fullname){
        editProfile.fullname=req.body.fullname;
    }
    if(req.body.username){
        editProfile.username=req.body.username;
    }
    if(req.body.education){
        editProfile.education=req.body.education;
    }
    if(req.body.skills){
        editProfile.skills=req.body.skills;
    }
    if(req.body.about){
        editProfile.about=req.body.about;
    }
    if(req.body.resume){
        editProfile.resume=req.body.resume;
    }
    if(req.body.experienceYrs){
        editProfile.experienceYrs=req.body.experienceYrs;
    }
    if(req.body.connectionSites){
        editProfile.connectionSites=req.body.connectionSites;
    }
    let official = await Seeker.findById(req.params.id);
    if(!req.seeker)return res.status(401).send("Not Allowed here");
    if(req.params.id!==req.seeker.id){
        return res.status(401).send("Not Allowed");
    }
    else official = await Seeker.findByIdAndUpdate(req.params.id,{$set:editProfile},{new:true});
    res.json(official);
})
module.exports = router;