// Copyright © 2023 Abhinav Chaitanya
import React, { useEffect, useContext,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JobContext from '../context/jobcontext';
import { Typography, Paper, Box ,Chip} from '@mui/material';
import Loader from './Loader';

const ViewCandidate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const applicant = location.state.applicant;
    let context = useContext(JobContext);
    const {Applicant, viewApplicant} = context;
    const [loading, setLoading] = useState(true);

  
      useEffect(() => {
        const fetchData = async () => {
          try {
            if (localStorage.getItem('token')) {
              await viewApplicant(applicant);
              setLoading(false); // Once data is fetched, set loading to false
            } else {
              navigate('/login');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Handle errors by setting loading to false
          }
        };
    
        fetchData();
        // eslint-disable-next-line
      }, []);
      if (loading) {
        return <Loader />;
      }
  return (
    <div style ={{
        backgroundColor: '#034159',
        paddingBottom: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
            Candidate Profile:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Name:</strong> {Applicant.fullname}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Email:</strong> {Applicant.email}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
           <strong> Education:</strong> {Applicant.education}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Experience(in yrs):</strong> {Applicant.experienceYrs}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>Other Connection Method:</strong> {Applicant.connectionSites}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              overflowWrap: 'break-word',
              textAlign: 'justify',
            }}
          >
            <strong>About:</strong> {Applicant.about}
          </Typography>
          {Applicant.skills?<Typography className="card-text">
            <strong>Skills-</strong>
            {Applicant.skills.map((skill) => {
              return (
                <Chip label={skill} size="small" sx={{ margin: "5px" }}></Chip>
              );
            })}
          </Typography>:<></>}
        </Box>
      </Paper>
    </div>
  )
}

export default ViewCandidate
