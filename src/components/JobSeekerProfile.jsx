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


const JobSeekerProfile = () => {
  const navigate = useNavigate();
  const context = useContext(JobContext);
  const { currSeekerDetails, getCurrSeekerAllDetails,editJobSeekerProfile} = context;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrSeekerAllDetails();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setEditedDetails(currSeekerDetails);
  }, [currSeekerDetails]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setEditedDetails(currSeekerDetails);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSkillsChange = (skills) => {
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      skills,
    }));
  };

  const handleSaveChanges = () => {
    // ...save changes logic
    toggleEditMode();
    editJobSeekerProfile(editedDetails._id,editedDetails.fullname,editedDetails.email,editedDetails.education,editedDetails.skills,editedDetails.experienceYrs,editedDetails.about,editedDetails.resume,editedDetails.connectionSites)
    toast.success('Edited profile successfully');
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
      <Typography
        sx={{ textAlign: "center", padding: "1rem", color: "#fff" }}
      >
        Your Profile
      </Typography>
      <Paper
        sx={{
          padding: "2rem",
          width: "80vw",
          margin: "auto",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        {currSeekerDetails && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="fullname"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Full Name
              </label>
              <input
                type="text"
                defaultValue={editedDetails.fullname || ""}
                id="fullname"
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                onChange={handleInputChange}
                readOnly={!isEditMode}
                minlength="3"
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
                htmlFor="email"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Email ID
              </label>
              <input
                type="email"
                defaultValue={editedDetails.email || ""}
                id="email"
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                onChange={handleInputChange}
                readOnly={!isEditMode}
                minlength="3"
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
                htmlFor="education"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Highest degree
              </label>
              <input
                type="text"
                defaultValue={editedDetails.education || ""}
                id="education"
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                onChange={handleInputChange}
                readOnly={!isEditMode}
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
                htmlFor="experienceYrs"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Years of Experience
              </label>
              <input
                type="text"
                defaultValue={editedDetails.experienceYrs || ""}
                id="experienceYrs"
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                onChange={handleInputChange}
                readOnly={!isEditMode}
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
                htmlFor="resume"
                style={{ marginRight: "10px", width: "30%" }}
              >
                Google Drive Resume link
              </label>
              <input
                type="text"
                defaultValue={editedDetails.resume || ""}
                id="resume"
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Typography sx={{ textAlign: "center" }}>Skills- </Typography>
              <MuiChipsInput
                sx={{ width: "80%", paddingBottom: "16px" }}
                value={editedDetails.skills || []}
                onChange={handleSkillsChange}
                readOnly={!isEditMode}
                variant="standard"
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
                htmlFor="about"
                style={{ marginRight: "10px", width: "30%", display: "block" }}
              >
                About
              </label>
              <textarea
                defaultValue={editedDetails.about || ""}
                id="about"
                style={{
                  flex: "1",
                  marginLeft: "10px",
                  display: "block",
                  margin: "auto",
                  height: "10vh",
                }}
                onChange={handleInputChange}
                readOnly={!isEditMode}
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
                htmlFor="connectionSites"
                style={{ marginRight: "10px", width: "30%", display: "block" }}
              >
                Other Connection Links
              </label>
              <input
                type="text"
                defaultValue={editedDetails.connectionSites || ""}
                id='connectionSites'
                style={{ flex: "1", marginLeft: "10px", width: "70%" }}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </div>
          </>
        )}
        {isEditMode ? (
          <button
            className="btn btn-dark"
            style={{
              width: "60%",
              margin: "auto",
              marginTop: "20px",
              marginBottom: "10px",
            }}
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="btn btn-dark"
            style={{
              width: "60%",
              margin: "auto",
              marginTop: "20px",
              marginBottom: "10px",
            }}
            onClick={toggleEditMode}
            
          >
            Edit Profile
          </button>
        )}
      </Paper>
    </div>
  );
};

export default JobSeekerProfile;
