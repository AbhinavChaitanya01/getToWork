import React, { useEffect, useContext, useState } from 'react';
import { Typography, Chip, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JobContext from '../context/jobcontext';
import toast from 'react-hot-toast';
import Loader from './Loader';

const MyApplications = () => {

    const navigate = useNavigate();
    const context = useContext(JobContext);
    const {myApplications,fetchMyApplications,deleteApplication} = context;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (localStorage.getItem('token')) {
            await fetchMyApplications();
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

        const [confirmationOpen, setConfirmationOpen] = useState(false); // State to control the confirmation popup
        const [deletingJobId, setDeletingJobId] = useState(null); // State to store the job ID being deleted

    const handleDeleteConfirmation = (applicationID) => {
        setDeletingJobId(applicationID);
        setConfirmationOpen(true);
    };

    const handleDeleteJob = async () => {
        try {
            await deleteApplication(deletingJobId);
            toast.success('Application withdrawn!');
            setConfirmationOpen(false);
            window.location.reload(); // Refresh the page
        } catch (error) {
            toast.error('Failed to withdraw.');
        }
    };
    if (loading) {
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
    <Modal open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Are you sure you want to withdraw this application?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className="btn btn-danger" style={{ marginRight: '10px' }} onClick={handleDeleteJob}>
              Yes
            </button>
            <button className="btn btn-secondary" onClick={() => setConfirmationOpen(false)}>
              No
            </button>
          </div>
        </div>
      </Modal>
      {myApplications.length===0?
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h3 style={{fontFamily:"Playfair Display", color:"#fff"}}>You don't have any active applications.</h3>
          <p style={{fontFamily:"Playfair Display", color:"#fff"}}>We have plenty job openings, search the one that matches you and apply easily!</p>
        </div>
      :
        <div className='row d-flex justify-content-center' style={{ marginRight: '0%' }}>
        {myApplications.map((application) => (
          <div key={application._id} className="card col-md-4 mx-2 my-3">
            <div className="card-body my-3">
              <div>
                <Typography className="card-text"><strong>Job Id- </strong>{application.jobId}</Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  <strong>Name of Company-</strong>{application.companyName}
                </Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                <strong>Applied on -</strong> {application.dateOfApplication && formatDate(application.dateOfApplication)} GMT
                </Typography>
                <Typography className="card-text" sx={{textJustify: 'inter-word' }}>
                <strong>Resume link in application-</strong> {application.resume}
                </Typography>

                <div style={{ textAlign: 'center' }}>
                  <button
                    style={{ width: '60%', margin: 'auto', marginBottom: '5px', display: 'block' }}
                    className="btn btn-dark"
                    onClick={() => handleDeleteConfirmation(application._id)}
                  >
                    Withdraw Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default MyApplications
