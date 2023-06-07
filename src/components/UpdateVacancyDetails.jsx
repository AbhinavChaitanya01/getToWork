import React , { useEffect, useContext,useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JobContext from '../context/jobcontext';
import { Typography, Paper, Box } from '@mui/material';
import { MuiChipsInput } from "mui-chips-input";
import  toast  from 'react-hot-toast';

const UpdateVacancyDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const jobCreated = location.state && location.state.jobCreated;
    const [editedDetails, setEditedDetails] = useState({});
    useEffect(() => {
        setEditedDetails(jobCreated);
      }, [jobCreated]);
    const context = useContext(JobContext);
    const {editVacancyDetails} = context;
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditedDetails((prevDetails) => ({
          ...prevDetails,
          [id]: value,
        }));
      };
    
    const handleSkillsChange = (skillsets) => {
        setEditedDetails((prevDetails) => ({
          ...prevDetails,
          skillsets,
        }));
    };

    const updateVacancy=()=>{
        editVacancyDetails(editedDetails._id,editedDetails.role,editedDetails.jobType,editedDetails.nature,editedDetails.salary,editedDetails.duration,editedDetails.skillsets,editedDetails.deadline,editedDetails.numberOfPositions,editedDetails.description,editedDetails.location);
        navigate('/getallcreatedjobs');
        toast.success('Successfully updated vacancy!')
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
                value ={editedDetails.role||""}
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
            <select style={{ flex: "1", marginLeft: "10px", width: "70%" }} id ="jobType" value ={editedDetails.jobType||""}
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
                value ={editedDetails.nature||""}
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
                value ={editedDetails.salary||""}
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
                value ={editedDetails.duration||""}
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
                value={editedDetails.skillsets||[]}
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
                value ={editedDetails.deadline}
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
                value ={editedDetails.numberOfPositions}
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
                value ={editedDetails.description||''}
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
                value ={editedDetails.location||''}
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
            onClick={updateVacancy}
          >
           Update vacancy with these details
          </button>
        </Paper>
    </div>
  )
}

export default UpdateVacancyDetails
