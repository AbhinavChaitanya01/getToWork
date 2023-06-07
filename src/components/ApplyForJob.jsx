import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JobContext from '../context/jobcontext';
import { Typography, Paper, Box } from '@mui/material';
import  toast  from 'react-hot-toast';


const ApplyForJob = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const job = location.state.jobdetails;
    let context = useContext(JobContext);
    const {currSeekerDetails, getCurrSeekerAllDetails,applyForJob} = context;
    const [resume,setResume] = useState('');
    const handleChange=(e)=>{
        setResume(e.target.value);
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
          getCurrSeekerAllDetails();
          if(!currSeekerDetails.fullname){
           navigate("/seekerhomepage");
          }
        }
      }, []);
    const apply=()=>{
        if(!resume){
            toast.error('Resume field cannot be empty!');
        }else{
            applyForJob(job._id,resume);
            toast.success('Applied for job successfully. All the best!');
            navigate("/seekerhomepage");
        }
    }
  return (
    <div style={{
        backgroundColor: '#034159',
        paddingBottom: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
       <Paper
        sx={{
          padding: '2rem',
          width: '80vw',
          margin: 'auto',
          textAlign: 'center',
          marginTop: '30px',
          overflowX: 'auto', // Enable horizontal scrolling if necessary
          maxHeight: '80vh', // Limit maximum height to prevent content overflow
        }}
      >
        <Box sx={{ maxWidth: '100%', overflowWrap: 'break-word', textAlign: 'justify' }}>
        <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', marginBottom: '1rem' }}>
            Application form - 
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          > <strong>You can apply for a particular job just once!</strong> </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Role:</strong> {job.role}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Name of Company:</strong> {job.companyName}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Nature :</strong> {job.nature}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Job Type:</strong> {job.jobType}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Annual Salary</strong> (expected, and maybe monthly or over the period in case of internship): {job.salary}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Location:</strong> {job.location}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Number of positions:</strong>  {job.numberOfPositions}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Deadline:</strong> {job.deadline && job.deadline.split("T")[0]}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Description:</strong>
            <div style={{ whiteSpace: "pre-wrap" }}>
               {job.description}
            </div>
          </Typography>
          <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
                <label htmlFor='resume' style={{ marginRight: "10px", width: "30%" }}>Add your resume* (google drive or other links in sharable mode and in pdf format)</label>
                <input id='resume' value={resume} style={{ flex: "1", marginLeft: "10px", width: "70%" }} onChange={handleChange} required/>
            </div>
            <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '0.8rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            By applying to this job you agree to comply with the terms and conditions (if mentioned in the job description) and understand that getToWork shares your profile and resume with this particular recruiter. However, getToWork does not guarantee the interactions between the job-seeker and recruiter in any form. All the best!
          </Typography>
          <div style={{textAlign:'center'}}>
          <button className='btn btn-dark' style={{
              width: "60%",
              margin: "auto",
              marginTop: "20px",
              marginBottom: "10px",
            }}
            onClick={apply}
            > 
            Apply for Job
            </button>
          </div>
        </Box>
      </Paper>

    </div>
  )
}

export default ApplyForJob
