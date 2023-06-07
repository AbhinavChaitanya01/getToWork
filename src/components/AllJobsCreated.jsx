import React, { useEffect, useContext, useRef, useState } from 'react';
import { Typography, Chip, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JobContext from '../context/jobcontext';
import toast from 'react-hot-toast';

const AllJobsCreated = () => {
  const navigate = useNavigate();
  const context = useContext(JobContext);
  const { jobsCreated, getJobsCreated, deleteJob } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getJobsCreated();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [JD, setJD] = useState('');
  const viewJD = (details) => {
    ref.current.click();
    setJD(details);
  };

  const [confirmationOpen, setConfirmationOpen] = useState(false); // State to control the confirmation popup
  const [deletingJobId, setDeletingJobId] = useState(null); // State to store the job ID being deleted

  const handleDeleteConfirmation = (jobId) => {
    setDeletingJobId(jobId);
    setConfirmationOpen(true);
  };

  const handleDeleteJob = async () => {
    try {
      await deleteJob(deletingJobId);
      toast.success('Vacancy deleted successfully!');
      setConfirmationOpen(false);
      window.location.reload(); // Refresh the page
    } catch (error) {
      toast.error('Failed to delete vacancy.');
    }
  };

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
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: 'none' }} ref={ref}>
      </button>
      <Modal open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete this vacancy?
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
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Job Description</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
            </div>
            <div class="modal-body" style={{ whiteSpace: "pre-wrap" }}>
              {JD}
            </div>
          </div>
        </div>
      </div>
      <div className='row d-flex justify-content-center' style={{ marginRight: '0%' }}>
        {jobsCreated.map((job) => (
          <div key={job._id} className="card col-md-4 mx-2 my-3">
            <div className="card-body my-3">
              <div>
                <Typography variant="h5" className="card-title">
                  {job.role} - {job.companyName}
                </Typography>
                <Typography className="card-text">Job Id- {job._id}</Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Type- {job.jobType}
                </Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Nature- {job.nature}
                </Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Salary- {job.salary}
                </Typography>
                <Typography className="card-text">
                  Skills Required-
                  {job.skillsets.map((skill) => (
                    <Chip key={skill} label={skill} size="small" sx={{ margin: '5px' }} />
                  ))}
                </Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Number of Positions- {job.numberOfPositions}
                </Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Location- {job.location}
                </Typography>
                <Typography className="card-text" sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Deadline - {job.deadline && job.deadline.split('T')[0]}
                </Typography>

                <div style={{ textAlign: 'center' }}>
                  <button
                    style={{ width: '60%', margin: 'auto', marginBottom: '5px', display: 'block' }}
                    className="btn btn-dark"
                    onClick={() => { viewJD(job.description) }}
                  >
                    Job Description
                  </button>
                  <button
                    style={{ width: '60%', margin: 'auto', marginBottom: '5px', display: 'block' }}
                    className="btn btn-dark"
                    onClick={()=>{
                      navigate('/recievedapplications',{state: {jobid: job._id}});
                    }}
                  >
                    View Applications
                  </button>
                  <button
                    style={{ width: '60%', margin: 'auto', marginBottom: '5px', display: 'block' }}
                    className="btn btn-dark"
                    onClick={() => {
                      navigate(`/updatevacancydetails`, { state: { jobCreated: job } });
                    }}
                  >
                    Update Vacancy Details
                  </button>
                  <button
                    style={{ width: '60%', margin: 'auto', marginBottom: '5px', display: 'block' }}
                    className="btn btn-dark"
                    onClick={() => handleDeleteConfirmation(job._id)}
                  >
                    Delete Vacancy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobsCreated;
