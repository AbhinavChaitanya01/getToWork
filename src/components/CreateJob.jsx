import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import JobContext from "../context/jobcontext";
import  toast  from 'react-hot-toast';


const CreateJob = () => {
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate('/login')
        }
    })

    const navigate = useNavigate();
    const context = useContext(JobContext);
    const {createdJob}=context;
    const [jobData,setJobData]= useState({deadline:'',numberOfPositions:''});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
      
        if (id === 'deadline') {
          // Format the date value
          const formattedValue = new Date(value).toISOString().split('T')[0];
          setJobData((prevDetails) => ({
            ...prevDetails,
            [id]: formattedValue,
          }));
        } else {
          setJobData((prevDetails) => ({
            ...prevDetails,
            [id]: value,
          }));
        }
      };
      
      
    const handleSkillsChange = (skillsets) => {
        setJobData((prevDetails) => ({
          ...prevDetails,
          skillsets,
        }));
      };
      const createVacancy = (event) => {
        event.preventDefault();
      
        // Check if required fields are filled
        if (
          !jobData.role ||
          !jobData.jobType ||
          !jobData.nature ||
          !jobData.salary ||
          !jobData.location
        ) {
          // Show an error message or handle the empty fields
          toast.error('Please fill in all required fields');
          return;
        }
      
        // If all required fields are filled, proceed with form submission
        createdJob(
          jobData.role,
          jobData.jobType,
          jobData.nature,
          jobData.salary,
          jobData.duration,
          jobData.skillsets,
          jobData.deadline,
          jobData.numberOfPositions,
          jobData.description,
          jobData.location
        );
      
        setJobData({ deadline: '', numberOfPositions: '' });
        toast.success('Created vacancy successfully');
    };
      
  return (
    <div
      style={{
        backgroundColor: "#034159",
        paddingTop: "20px",
        paddingBottom: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <Typography sx={{ textAlign: "center", padding: "1rem", color: "#fff" }}>
            Create a vacancy (We request you to avoid confusing terms and phrases).
        </Typography>
        <Paper
        sx={{
          padding: "2rem",
          width: "80vw",
          margin: "auto",
          textAlign: "center",
          marginTop: "30px",
        }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}>
              <label
                htmlFor="role"
                style={{ marginRight: "10px", width: "30%" }}>
                Role*:
              </label>
              <input
                type="text"
                id="role"
                value ={jobData.role||""}
                onChange={handleInputChange}
                style={{ flex: "1", marginLeft: "10px", width: "70%" }} required/>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}>
            <label style={{ marginRight: "10px", width: "30%" }}>Job Type*:</label>
            <select style={{ flex: "1", marginLeft: "10px", width: "70%" }} id ="jobType" value ={jobData.jobType||""}
                onChange={handleInputChange} required>
                <option value="">Select one</option>
                <option value="full-time">Full-time</option>
                <option value="adhoc">Adhoc</option>
                <option value="intern">Intern</option>
            </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="nature"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Nature*:
              </label>
              <input
                type="text"
                id="nature"
                value ={jobData.nature||""}
                onChange={handleInputChange}
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                placeholder="onsite,remote or hybrid ..."
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="salary"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Annual salary (in INR)*:
              </label>
              <input
                type="text"
                id="salary"
                value ={jobData.salary||""}
                onChange={handleInputChange}
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
             <label
                htmlFor="duration"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Duration:
              </label>
              <input
                type="text"
                id="duration"
                value ={jobData.duration||""}
                onChange={handleInputChange}
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                placeholder="if applicable"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Typography sx={{ textAlign: "center" }}>Skills- </Typography>
              <MuiChipsInput
                sx={{ width: "80%", paddingBottom: "16px" }}
                variant="standard"
                id='skillsets'
                value={jobData.skillsets||[]}
                onChange={handleSkillsChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
             <label
                htmlFor="deadline"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Deadline for applications:
              </label>
              <input
                type="date"
                id="deadline"
                value ={jobData.deadline}
                onChange={handleInputChange}
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
             <label
                htmlFor="numberOfPositions"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Number of positions:
              </label>
              <input
                type="number"
                id="numberOfPositions"
                value ={jobData.numberOfPositions}
                onChange={handleInputChange}
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="description"
                style={{ marginRight: "10px", width: "30%", display: "block" }}
              >
                Job description
              </label>
              <textarea
                id="description"
                value ={jobData.description||''}
                onChange={handleInputChange}
                style={{
                  flex: "1",
                  marginLeft: "10px",
                  display: "block",
                  margin: "auto",
                  height: "30vh",
                }} 
                placeholder="add all necessary details and links"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
             <label
                htmlFor="location"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Location*:
              </label>
              <input
                type="text"
                id="location"
                value ={jobData.location||''}
                onChange={handleInputChange}
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                required
              />

            </div>
            <button
            className="btn btn-dark"
            style={{
              width: "60%",
              margin: "auto",
              marginTop: "20px",
              marginBottom: "10px",
            }}
            onClick={createVacancy}
          >
           Create vacancy
          </button>
        </Paper>
    </div>
  )
}

export default CreateJob;
