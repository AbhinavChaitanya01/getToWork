import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JobContext from '../context/jobcontext';
import { Typography, Paper, Box } from '@mui/material';
import toast from 'react-hot-toast';
import Loader from './Loader';

const GetApplications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobid = location.state.jobid;
  let context = useContext(JobContext);
  const { applicationsFetched, fetchAllApplications } = context;

  const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (localStorage.getItem('token')) {
            await fetchAllApplications(jobid);
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

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    };
    return dateObj.toLocaleDateString('en-US', options);
  };
  if(loading){
    return <Loader />;
  }
  return (
    <div
      style={{
        backgroundColor: '#034159',
        margin: '0px',
        paddingTop: '20px',
        paddingBottom: '20px',
        minHeight: '100vh',
      }}
    >
    {applicationsFetched.length === 0 ? 
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3 style={{fontFamily:"Playfair Display", color:"#fff"}}>No applications have been received yet.</h3>
      <p style={{fontFamily:"Playfair Display", color:"#fff"}}>Check back later for updates!</p>
    </div> :
      <div className='row d-flex justify-content-center' style={{ marginRight: '0%' }}>
        {applicationsFetched.map((application) => (
          <div key={application._id} className="card col-md-4 col-lg-4 mx-2 my-3">
            <div className="card-body my-3">
              <div>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  <strong>resume-</strong> {application.resume}
                  <i class="fa-solid fa-copy" style={{paddingLeft:'10px'}} onClick={() => {navigator.clipboard.writeText(application.resume); toast.success('copied to clipboard')}}></i>
                </Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Applied on - {application.dateOfApplication && formatDate(application.dateOfApplication)} GMT
                </Typography>
                <button className='btn btn-dark' onClick={()=>{
                    navigate("/viewcandidate", { state: { applicant: application.applicantId} });
                }}>
                View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default GetApplications;
