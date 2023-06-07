import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JobContext from '../context/jobcontext';
import { Typography, Paper, Box } from '@mui/material';

const ViewRecruiter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recruiter = location.state.recruiter;
  let context = useContext(JobContext);
  const { viewRecruiterDetails, viewThisRecruiter } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      viewThisRecruiter(recruiter);
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
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
            Recruiter Profile:
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
            <strong>Name of Company:</strong> {viewRecruiterDetails.companyName}
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
            <strong>Name of Recruiter:</strong> {viewRecruiterDetails.recruiterName}
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
           <strong> Email:</strong> {viewRecruiterDetails.email}
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
            <strong>Employer description:</strong> {viewRecruiterDetails.description}
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
            <strong>Website:</strong> {viewRecruiterDetails.website}
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default ViewRecruiter;
