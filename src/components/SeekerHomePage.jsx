import React , {useEffect, useContext, useState, useRef} from 'react'
import JobTile from './JobTile'
import { useNavigate } from 'react-router-dom';
import JobContext from '../context/jobcontext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import toast from "react-hot-toast";
import JobSeekerNavbar from './JobSeekerNavbar';



const SeekerHomePage = () => {
  let context = useContext(JobContext);
  const {seekerName,jobs,getAllJobs,getCurrSeeker} = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllJobs();
      getCurrSeeker();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref= useRef(null);
  const refClose = useRef(null);
  const [JD, setJD]= useState('');
  const viewJD = (details) => {
    ref.current.click();
    setJD(details);
  };

    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [salaryFilter, setSalaryFilter] = useState({ min: 0, max: 10000000});
    const [roleFilter, setRoleFilter] = useState('');
    const [companyNameFilter, setCompanyNameFilter] = useState('');
    const [jobTypeFilter, setJobTypeFilter] = useState('');
    const [applyFilter, setFilter] = useState(false);
    const [filteredJobs,setFilteredJobs] =useState(jobs);
    const [isfilterApplied, setFilterTrue]=useState(false);
    const [jobIdFilter, setJobIdFilter] = useState('');


    const toggleFilter =()=>{
        setFilter(!applyFilter);
    }
    const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleLocationFilterChange = (e) => {
      setLocationFilter(e.target.value);
    };
  
    const handleSalaryFilterChange = (values) => {
      setSalaryFilter({ min: values[0], max: values[1] });
    };
  
    const handleRoleFilterChange = (e) => {
      setRoleFilter(e.target.value);
    };
  
    const handleCompanyNameFilterChange = (e) => {
      setCompanyNameFilter(e.target.value);
    };
  
    const handleJobTypeFilterChange = (e) => {
      setJobTypeFilter(e.target.value);
    };


    const applyAllFilters = () => {
      const jobsAfterFilter = jobs.filter((job) =>
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) &&
        job.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
        job.salary >= salaryFilter.min &&
        job.salary <= salaryFilter.max &&
        job.companyName.toLowerCase().includes(companyNameFilter.toLowerCase()) &&
        (jobTypeFilter === '' || job.jobType.toLowerCase().includes(jobTypeFilter.toLowerCase())) &&
        job._id.toLowerCase().includes(jobIdFilter.toLowerCase()) // Add the job ID filter
      );
      setFilteredJobs(jobsAfterFilter);
      setFilter(false);
      setFilterTrue(true);
    };
    


  return (
    
    <div style={{backgroundColor:'#034159', margin:'0px' ,paddingTop:'20px',paddingBottom:'20px',minHeight:'100vh'}}>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:'none'}} ref={ref}>
</button>
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
      <div style={{fontFamily:'Handlee',fontSize:'2rem',color:'#fff',textAlign:'center'}}>Hi {seekerName}!</div>
        {/* <div style={{textAlign:"center"}}> 
          {jobs.length===0 && 'No jobs open to display'}
        </div> */}
        <div>
    <Paper
        sx={{
          padding: "10px",
          width: "80vw",
          margin: "auto",
          textAlign: "center",
          marginTop: "30px",
          marginBottom:'20px'
        }}
      >
      <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}>
        <label  style={{ marginRight: "10px", width: "20%" }} >Apply your choices :</label>
        <input type="text" value={searchQuery} style={{ flex: "1", width: "60%" }} onChange={handleSearchInputChange} placeholder='search by role (you can add filters like Job ID, location, salary,...)' />
        <i class="fa-solid fa-magnifying-glass fa-lg"  style={{padding:'10px'}} onClick={applyAllFilters} ></i>
        <i className="fa-solid fa-filter fa-lg" style={{padding:'10px'}} onClick={toggleFilter} ></i>
      </div>
      </Paper>
      {applyFilter?<Paper
        sx={{
          padding: "2rem",
          width: "80vw",
          margin: "auto",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
      <div style={{
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: "20px",
}}>
  <label style={{ marginRight: "10px", width: "30%" }}>Job ID:</label>
  <input
    type="text"
    value={jobIdFilter}
    onChange={(e) => setJobIdFilter(e.target.value)}
    style={{ flex: "1", marginLeft: "10px", width: "70%" }}
  />
</div>

      <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}>
        <label style={{ marginRight: "10px", width: "30%" }}>Location:</label>
        <input type="text" value={locationFilter} onChange={handleLocationFilterChange} style={{ flex: "1", marginLeft: "10px", width: "70%" }} />
      </div>
       <div>
        <label>Annual Salary Range:</label>
        <Slider
          range
          min={0}
          max={10000000}
          value={[salaryFilter.min, salaryFilter.max]}
          onChange={handleSalaryFilterChange}
        />
        <div>
          Min: {salaryFilter.min} - Max: {salaryFilter.max}
        </div>
      </div>
      <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}>
        <label style={{ marginRight: "10px", width: "30%" }}>Role:</label>
        <input type="text" value={roleFilter} onChange={handleRoleFilterChange} style={{ flex: "1", marginLeft: "10px", width: "70%" }} />
      </div>
      <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}>
        <label style={{ marginRight: "10px", width: "30%" }}>Company Name:</label>
        <input type="text" value={companyNameFilter} onChange={handleCompanyNameFilterChange} style={{ flex: "1", marginLeft: "10px", width: "70%" }} />
      </div>
      <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
              }}>
        <label style={{ marginRight: "10px", width: "30%" }}>Job Type:</label>
        <select value={jobTypeFilter} style={{ flex: "1", marginLeft: "10px", width: "70%" }} onChange={handleJobTypeFilterChange}>
          <option value="">All</option>
          <option value="full-time">Full-time</option>
          <option value="adhoc">Adhoc</option>
          <option value="intern">Intern</option>
        </select>
      </div>
      </Paper>:<></>}
    </div>
      <div className='row d-flex justify-content-center'style={{marginRight:'0%'}}>
        <div style={{textAlign:"center"}}> 
          {jobs.length===0 && 'No jobs open to display'}
        </div>
        {/* <div style={{width:'80%',margin:'auto'}}> */}
        {isfilterApplied?(filteredJobs.length>0?filteredJobs.map((job) => {
          return (
            <JobTile key={job._id}
              jobId ={job._id}
              job={job}
              viewJD={viewJD}
            />
          );
        }):<div style={{fontFamily:'Handlee',fontSize:'2rem',color:'#fff',textAlign:'center', paddingTop:'3rem'}}>No Matching search results</div>):(
          jobs.map((job) => {
          return (
            <JobTile key={job._id}
              jobId ={job._id}
              job={job}
              viewJD={viewJD}
            />
          );
        }))}
        {/* </div> */}
      </div>
    </div>
  )
}

export default SeekerHomePage
