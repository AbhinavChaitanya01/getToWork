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

// ROUTE:1 CREATE a RECRUITER using : POST "/api/auth/createrecruiter" No login required

router.post('/createrecruiter',[
    body('companyName','minimum length of 3 characters required').isLength({min:3}),
    body('email','must be a valid email').isEmail(),
    body('recruiterName','minimum 3 characters').isLength({ min:3 }),
    body('password','Password must be atleast 5 characters ').isLength({ min: 5 }),
    body('username','Userrname must be unique and minimum 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
    let success = false;
    // if bad request return errors and bad request
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether a recruiter with this email already exists:
    try{
        let recruiter = await Recruiter.findOne({email: req.body.email});
        if(recruiter){       
            return res.status(400).json({success, error: "account with this email already exists!"});
        }
        recruiter = await Recruiter.findOne({username: req.body.username});
        if(recruiter){       
            return res.status(400).json({success, error: "account with this username exists!"});
        }
        // 10 rounds of hashing
        const salt =  bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        recruiter = await Recruiter.create({
            companyName: req.body.companyName,
            email:req.body.email,
            password: secPass,
            username:req.body.username,
            recruiterName: req.body.recruiterName
        });
        const data= {
            recruiter:{
                id: recruiter.id
            }
        }
        const authToken = jwt.sign(data,process.env.REACT_APP_JWTSECRET);
        success= true;
        res.json({success, authToken});
    } catch (error){
        res.status(500).send("Some error occured");
    }
});

// ROUTE:2 CREATE a jobseeker using : POST "/api/auth/createjobseeker" No login required

router.post('/createjobseeker',[
    body('fullname').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('username').isLength({ min: 5 }),
],async(req,res)=>{
    let success = false;
    // if bad request return errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether a job-seeker with this email already exists:
    try{
        let seeker = await Seeker.findOne({email: req.body.email});
        if(seeker){       
            return res.status(400).json({success, error: "account with this email already exists!"});
        }
        seeker = await Seeker.findOne({username: req.body.username});
        if(seeker){       
            return res.status(400).json({success, error: "account with this username already exists!"});
        }
        // 10 rounds of hashing
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        seeker = await Seeker.create({
            fullname: req.body.fullname,
            email:req.body.email,
            password: secPass,
            username:req.body.username,
        });
        const data= {
            seeker:{
                id: seeker.id
            }
        }
        const authToken = jwt.sign(data,process.env.REACT_APP_JWTSECRET);
        success= true;
        res.json({success, authToken});
    } catch (error){
        res.status(500).send("Some error occured");
    }
});

// ROUTE 3: AUTHENTICATE a recruiter using : POST "/api/auth/recruiterlogin"
router.post("/recruiterlogin",[
    body('email').isEmail(),
    body('password').exists()
],async(req,res)=>{
    let success= false;
    // if bad request return errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let recruiter = await Recruiter.findOne({email});
        if(!recruiter){
            return res.status(400).json({error:"incorrect credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,recruiter.password);
        if(!passwordCompare){
            return res.status(400).json({success, error:"incorrect credentials"});
        }

        const data= {
            recruiter:{
                id: recruiter.id
            }
        }
        const authToken = jwt.sign(data,process.env.REACT_APP_JWTSECRET);
        success=true;
        res.json({success,authToken});

    } catch (error) {
        res.status(500).send("internal server error");
    }
})

// ROUTE 4: AUTHENTICATE a job-seeker using : POST "/api/auth/jobseekerlogin"
router.post("/jobseekerlogin",[
    body('email').isEmail(),
    body('password').exists()
],async(req,res)=>{
    let success= false;
    // if bad request return errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let seeker = await Seeker.findOne({email});
        if(!seeker){
            return res.status(400).json({error:"incorrect credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,seeker.password);
        if(!passwordCompare){
            return res.status(400).json({success, error:"incorrect credentials"});
        }

        const data= {
            seeker:{
                id: seeker.id
            }
        }
        const authToken = jwt.sign(data,process.env.REACT_APP_JWTSECRET);
        success=true;
        res.json({success,authToken});

    } catch (error) {
        res.status(500).send("internal server error");
    }
})

// Route 5: get logged-in recruiter details using GET "/api/auth/getrecruiter",Login required
router.get("/getrecruiter",fetchrecruiter,async (req,res)=>{
    try {
        const recruiterId= req.recruiter.id;
        const recruiter = await Recruiter.findById(recruiterId).select("-password");
        res.send(recruiter);
    } catch (error) {
       
        res.status(500).send("internal server error");
    }
})

// Route 6: get logged-in jobseeker details using GET "/api/auth/getseeker",Login required
router.get("/getseeker",fetchseeker,async (req,res)=>{
    try {
        const seekerId= req.seeker.id;
        const seeker = await Seeker.findById(seekerId).select("-password");
        res.send(seeker);
    } catch (error) {
       
        res.status(500).send("internal server error");
    }
})

module.exports = router;