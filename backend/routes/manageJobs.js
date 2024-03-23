// Copyright © 2023 Abhinav Chaitanya
const express = require('express');
const Recruiter = require('../models/recruiter');
const Seeker = require('../models/jobSeeker');
const Jobs= require('../models/createdJobs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

var fetchrecruiter = require("../middleware/fetchRecruiter");
var fetchseeker = require("../middleware/fetchSeeker");
const createdJobs = require('../models/createdJobs');


// WITHOUT PAGINATION: v1: ROUTE 1: get all jobs posted on site using: GET "/api/managejobs/fetchalljobs"
// router.get("/fetchalljobs",async(req,res)=>{
//     try{
//         const jobs = await Jobs.find();
//         res.json(jobs);
//     }catch(error){
//         res.status(500).send("internal server error");
//     }
// })

// ROUTE 1: get all jobs posted on site using: GET "/api/managejobs/fetchalljobs"
router.get("/fetchalljobs", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limitPerPage = parseInt(req.query.limit) || 10; // Default to 20 items per page if not provided
        const skip = (page - 1) * limitPerPage;
        const jobs = await Jobs.find().skip(skip).limit(limitPerPage);
        // Get total count of jobs for pagination metadata
        const totalJobsCount = await Jobs.countDocuments();
        // Calculate total pages
        const totalPages = Math.ceil(totalJobsCount / limitPerPage);
        res.json({
            jobs,
            currentPage: page,
            totalPages,
            totalJobsCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});


// ROUTE 1.1: get all jobs posted on site based on jobID: GET "/api/managejobs/searchjobbyid/:jobId
router.get("/searchjobbyid/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Jobs.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        // console.log(job);
        res.json(job);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// v1 : ROUTE 1.2 WITHOUT PAGINATION: get all jobs based on search query: GET /api/managejobsbyfilter/searchjobs?location=desired_location&role=desired_role&companyName=desired_company&jobType=desired_job_type&minSalary=desired_min_salary&maxSalary=desired_max_salary
// router.get("/searchjobsbyfilter", async (req, res) => {
//     try {
//         const { location, role, companyName, jobType, minSalary, maxSalary } = req.query;
//         const query = {};
//         if (location) query.location = location;
//         if (role) query.role = role;
//         if (companyName) query.companyName = companyName;
//         if (jobType) query.jobType = jobType;
//         if (minSalary !== undefined && maxSalary !== undefined) {
//             query.salary = { $gte: parseInt(minSalary), $lte: parseInt(maxSalary) };
//         } else if (minSalary !== undefined) {
//             query.salary = { $gte: parseInt(minSalary) };
//         } else if (maxSalary !== undefined) {
//             query.salary = { $lte: parseInt(maxSalary) };
//         }
//         const jobs = await Jobs.find(query);
//         if (!jobs) {
//             return res.status(404).json({ message: "Job not found" });
//         }
//         res.json(jobs);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal server error");
//     }
// });

// ROUTE 1.2 : get all jobs based on search query: GET /api/managejobsbyfilter/searchjobs?location=desired_location&role=desired_role&companyName=desired_company&jobType=desired_job_type&minSalary=desired_min_salary&maxSalary=desired_max_salary
router.get("/searchjobsbyfilter", async (req, res) => {
    try {
        const { location, role, companyName, jobType, minSalary, maxSalary, page, limit } = req.query;
        // Convert page and limit to integers
        const pageNumber = parseInt(page) || 1;
        const limitPerPage = parseInt(limit) || 10; // Default limit is 20
        // Calculate the number of documents to skip based on the page number and limit
        const skip = (pageNumber - 1) * limitPerPage;
        const query = {};
        if (location) query.location = location;
        if (role) query.role = role;
        if (companyName) query.companyName = companyName;
        if (jobType) query.jobType = jobType;
        if (minSalary !== undefined && maxSalary !== undefined) {
            query.salary = { $gte: parseInt(minSalary), $lte: parseInt(maxSalary) };
        } else if (minSalary !== undefined) {
            query.salary = { $gte: parseInt(minSalary) };
        } else if (maxSalary !== undefined) {
            query.salary = { $lte: parseInt(maxSalary) };
        }
        // Execute the query with pagination parameters
        const jobs = await Jobs.find(query)
            .skip(skip)
            .limit(limitPerPage);

        // Count total documents (for calculating total pages)
        const totalJobsCount = await Jobs.countDocuments(query);
        // Calculate total pages
        const totalPages = Math.ceil(totalJobsCount / limitPerPage);
        // Prepare pagination metadata
        const paginationMeta = {
            currentPage: pageNumber,
            totalPages: totalPages,
            totalItems: totalJobsCount
        };
        // Send the paginated results along with pagination metadata as a JSON response
        res.json({
            jobs: jobs,
            pagination: paginationMeta
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 2: Recruiter creates a job using : POST "/api/managejobs/createjob" 
// -- login required...
router.post("/createjob",fetchrecruiter,[
    body('role').isLength({min:3}),
    body('jobType').isLength({min:3}),
    body('nature').isLength({min:3}),
    body('salary').isNumeric(),
    body('location').isLength({min:3})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if(!req.recruiter)return res.status(401).send("Not Allowed here");
    try{
        const user = await Recruiter.findById(req.recruiter.id);
        const newJob= new Jobs({
            recruiter: req.recruiter.id,
            companyName:user.companyName,
            role: req.body.role,
            jobType: req.body.jobType,
            nature: req.body.nature,
            salary: req.body.salary,
            duration: req.body.duration,
            skillsets: req.body.skillsets,
            deadline: req.body.deadline,
            numberOfPositions:req.body.numberOfPositions,
            description: req.body.description,
            location: req.body.location
        })
        const madeJob = await newJob.save();
        res.json(madeJob);
    }catch(error){
        res.status(500).send("internal server error");
    }
}) 

// ROUTE 3: Update Job using PUT "/api/managejobs/updatecreatedjob/:id"
// access to creater recruiter only 
router.put("/updatecreatedjob/:id",fetchrecruiter,async(req,res)=>{
    const editedJob= {};
    if(req.body.role){
        editedJob.role= req.body.role;
    }
    if(req.body.jobType){
        editedJob.jobType=req.body.jobType;
    }
    if(req.body.nature){
        editedJob.nature=req.body.nature;
    }
    if(req.body.salary){
        editedJob.salary = req.body.salary;
    }
    if(req.body.duration){
        editedJob.duration= req.body.duration;
    }
    if(req.body.skillsets){
        editedJob.skillsets = req.body.skillsets;
    }
    if(req.body.deadline){
        editedJob.deadline = req.body.deadline;
    }
    if(req.body.numberOfPositions){
        editedJob.numberOfPositions=req.body.numOfPositions;
    }
    if(req.body.location){
        editedJob.location = req.body.location;
    }
    if(req.body.description){
        editedJob.description=req.body.description;
    }

    let createdjob=await Jobs.findById(req.params.id);
    // no such job exists
    if(!createdjob)return res.status(404).send("Not found");
    // if not created by this recruiter
    if(createdjob.recruiter.toString()!=req.recruiter.id){
        return res.status(401).send("Access denied");
    }
    createdjob = await Jobs.findByIdAndUpdate(req.params.id,{$set:editedJob},{new:true});
    res.json({createdjob});
})

// ROUTE 4: DELETE Job using DELETE "/api/managejobs/deletecreatedjob/:id"
// access to creater recruiter only 
router.delete("/deletecreatedjob/:id",fetchrecruiter,async(req,res)=>{
    let createdjob=await Jobs.findById(req.params.id);
    // no such job exists
    if(!createdjob)return res.status(404).send("Not found");
    // if not created by this recruiter
    if(createdjob.recruiter.toString()!=req.recruiter.id){
        return res.status(401).send("Access denied");
    }
    createdjob = await Jobs.findByIdAndDelete(req.params.id);
    res.json({Success:"job deleted !"});
})


// ROUTE 5: get all jobs created by a recruiter
router.get("/getjobscreated",fetchrecruiter,async(req,res)=>{
    if(!req.recruiter)return res.status(401).send("Access Denied");
    try{
        const alljobscreated = await Jobs.find({recruiter: req.recruiter.id});
        res.json(alljobscreated);
    }catch(error){
        res.status(500).send("internal server error");
    }
})

module.exports = router;


