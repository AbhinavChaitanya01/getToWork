import { Chip, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const JobTile = (props) => {
  const { jobId, job, viewJD } = props;
  const navigate = useNavigate();
  const handleViewRecruiter = () => {
    // Redirect to the desired component and pass job.recruiter as a prop
    navigate("/viewrecruiter", { state: { recruiter: job.recruiter } });
  };
  const handleApply = () => {
    navigate("/applyforjob",{state:{jobdetails : job}});
  };
  return (
    <div className="card col-md-6 col-lg-3 mx-2 my-3">
      <div className="card-body my-3">
        {/* <Paper sx={{padding:"2rem"}} > */}
        <div>
          <Typography variant="h5" className="card-title">
            {job.role} - {job.companyName}
          </Typography>
          <Typography className="card-text">Job Id- {jobId}</Typography>
          <Typography
            className="card-text"
            sx={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            Type- {job.jobType}
          </Typography>
          <Typography
            className="card-text"
            sx={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            Nature- {job.nature}
          </Typography>
          <Typography
            className="card-text"
            sx={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            Salary- {job.salary}
          </Typography>
          <Typography className="card-text">
            Sills Required-
            {job.skillsets.map((jobs) => {
              return (
                <Chip label={jobs} size="small" sx={{ margin: "5px" }}></Chip>
              );
            })}
          </Typography>
          <Typography
            className="card-text"
            sx={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            Number of Positions- {job.numberOfPositions}
          </Typography>
          <Typography
            className="card-text"
            sx={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            Location- {job.location}
          </Typography>
          <Typography
            className="card-text"
            sx={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            Deadline - {job.deadline && job.deadline.split("T")[0]}
          </Typography>

          <div style={{ textAlign: "center" }}>
            <button
              style={{
                width: "60%",
                margin: "auto",
                marginBottom: "5px",
                display: "block",
              }}
              className="btn btn-dark"
              onClick={() => {
                viewJD(job.description);
              }}
            >
              Job Description
            </button>
            <button
              style={{
                width: "60%",
                margin: "auto",
                marginBottom: "5px",
                display: "block",
              }}
              className="btn btn-dark"
              onClick={
                handleApply
              }
            >
              Apply
            </button>
            <button
              style={{
                width: "60%",
                margin: "auto",
                marginBottom: "5px",
                display: "block",
              }}
              className="btn btn-dark"
              onClick={handleViewRecruiter}
            >
              View Recruiter
            </button>
          </div>
        </div>
        {/* </Paper> */}
      </div>
    </div>
  );
};

export default JobTile;
