import React , { useEffect, useContext, useState } from "react";
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
import toast from "react-hot-toast";

const RecruiterProfile = () => {

  const navigate = useNavigate();
  const context = useContext(JobContext);
  const { currRecruiterDetails, getCurrRecruiterAllDetails,editRecruiterProfile } = context;
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrRecruiterAllDetails();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setEditedDetails(currRecruiterDetails);
  }, [currRecruiterDetails]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setEditedDetails(currRecruiterDetails);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };
  const handleSaveChanges= ()=>{
    toggleEditMode();
    editRecruiterProfile(editedDetails._id,editedDetails.companyName,editedDetails.recruiterName,editedDetails.email,editedDetails.companySize,editedDetails.description,editedDetails.website)
    toast.success('Edited profile successfully');
  }
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="companyName"
            style={{ marginRight: "10px", width: "30%" }}
          >
            Name Of Company
          </label>
          <input
            type="text"
            id="companyName"
            defaultValue={editedDetails.companyName||""}
            style={{ flex: "1", marginLeft: "10px", width: "70%" }}
            minlength="3"
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
            htmlFor="recruiterName"
            style={{ marginRight: "10px", width: "30%" }}
          >
          Recruiter's Name
          </label>
          <input
            type="text"
            id="recruiterName"
            style={{ flex: "1", marginLeft: "10px", width: "70%" }}
            defaultValue={editedDetails.recruiterName||""}
            minlength="3"
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
            htmlFor="email"
            style={{ marginRight: "10px", width: "30%" }}
          >
            Email ID
          </label>
          <input
            type="email"
            id="email"
            style={{ flex: "1", marginLeft: "10px", width: "70%" }}
            defaultValue={editedDetails.email||""}
            minlength="3"
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
            htmlFor="companySize"
            style={{ marginRight: "10px", width: "30%" }}
          >
            Company Size
          </label>
          <select
            id="companySize"
            style={{ flex: "1", marginLeft: "10px", width: "70%" }}
            defaultValue={editedDetails.companySize||""}
            onChange={handleInputChange}
            disabled={!isEditMode}
          >
          <option value='10-100'>10-100</option>
          <option value='100-1000'>100-1000</option>
          <option value='1000-10000'>1000-10000</option>
          <option value='10000+'>10000+</option>
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
            htmlFor="description"
            style={{ marginRight: "10px", width: "30%" }}
          >
            Employer Description
          </label>
          <textarea
            type="text"
            id="description"
            style={{ flex: "1", marginLeft: "10px", width: "70%", height: "10vh"}}
            defaultValue={editedDetails.description||""}
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
            htmlFor="website"
            style={{ marginRight: "10px", width: "30%" }}
          >
            Website
          </label>
          <input
            type="text"
            id="website"
            style={{ flex: "1", marginLeft: "10px", width: "70%" }}
            defaultValue={editedDetails.website||""}
            onChange={handleInputChange}
            readOnly={!isEditMode}
          />
        </div>
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
          </button>)}
      </Paper>
    </div>
  );
};

export default RecruiterProfile;
