// Copyright © 2023 Abhinav Chaitanya
import React, { useEffect, useContext, useState, useRef } from "react";
import JobTile from "./JobTile";
import { useNavigate } from "react-router-dom";
import JobContext from "../context/jobcontext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import toast from "react-hot-toast";
import JobSeekerNavbar from "./JobSeekerNavbar";
import Loader from "./Loader";
import InfinityLoader from "./InfinityLoader.gif";
import Pagination from "@mui/material/Pagination";

const SeekerHomePage = () => {
  let context = useContext(JobContext);
  const {
    seekerName,
    getAllJobs,
    getCurrSeeker,
    searchJobsByFilter,
    searchJobById,
  } = context;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("token")) {
          const response = await getAllJobs(1, limit);
          setJobs(response.jobs);
          setTotalItems(response.totalItems);
          setTotalPages(Math.ceil(response.totalItems / limit));
          await getCurrSeeker();
          setLoading(false); // Once data is fetched, set loading to false
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Handle errors by setting loading to false
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [JD, setJD] = useState("");
  const viewJD = (details) => {
    ref.current.click();
    setJD(details);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState({ min: 0, max: 10000000 });
  const [roleFilter, setRoleFilter] = useState("");
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [applyFilter, setFilter] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isfilterApplied, setFilterTrue] = useState(false);
  const [jobIdFilter, setJobIdFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [jobs, setJobs] = useState([]);
  const limit = 10;

  const toggleFilter = () => {
    setFilter(!applyFilter);
  };

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
  const [loadingFilteredJobs, setLoadingFilteredJobs] = useState(false);
  const applyAllFilters = async () => {
    setLoadingFilteredJobs(true);
    const criteria = {
      minSalary: salaryFilter.min,
      maxSalary: salaryFilter.max,
    };
    if (locationFilter) criteria.location = locationFilter;
    if (roleFilter || searchQuery) criteria.role = roleFilter || searchQuery;
    if (companyNameFilter) criteria.companyName = companyNameFilter;
    if (jobTypeFilter) criteria.jobType = jobTypeFilter;
    if (!jobIdFilter) {
      setLoadingFilteredJobs(true);
      try {
        const response = await searchJobsByFilter(criteria, 1, limit);
        setFilteredJobs(response.jobs);
        setTotalItems(response.totalItems);
        setTotalPages(Math.ceil(response.totalItems / limit));
        setFilter(false);
        setFilterTrue(true);
      } catch (error) {
        console.error("Error applying filters:", error);
        toast.error("Some error occured!");
      } finally {
        setLoadingFilteredJobs(false);
      }
    } else {
      setLoadingFilteredJobs(true);
      try {
        const response = await searchJobById(jobIdFilter);
        console.log(response);
        setFilteredJobs(response.job);
        setTotalItems(response.totalItems);
        setTotalPages(1);
        setFilter(false);
        setFilterTrue(true);
      } catch (error) {
        console.error("Error applying filters:", error);
        toast.error("Some error occured!");
      } finally {
        setLoadingFilteredJobs(false);
      }
    }
  };

  const handlePageChange = async (event, page) => {
    setCurrentPage(page);
    if (isfilterApplied) {
      setLoadingFilteredJobs(true);
      const criteria = {
        minSalary: salaryFilter.min,
        maxSalary: salaryFilter.max,
      };
      if (locationFilter) criteria.location = locationFilter;
      if (roleFilter || searchQuery) criteria.role = roleFilter || searchQuery;
      if (companyNameFilter) criteria.companyName = companyNameFilter;
      if (jobTypeFilter) criteria.jobType = jobTypeFilter;
      if (!jobIdFilter) {
        setLoadingFilteredJobs(true);
        try {
          const response = await searchJobsByFilter(criteria, page, limit);
          setFilteredJobs(response.jobs);
          setTotalItems(response.totalItems);
          setTotalPages(Math.ceil(response.totalItems / limit));
          setFilter(false);
          setFilterTrue(true);
        } catch (error) {
          console.error("Error applying filters:", error);
          toast.error("Some error occured!");
        } finally {
          setLoadingFilteredJobs(false);
        }
      } else {
        setLoadingFilteredJobs(true);
        try {
          const response = await searchJobById(jobIdFilter);
          setFilteredJobs(response.job);
          setTotalItems(response.totalItems);
          setTotalPages(1);
          setFilter(false);
          setFilterTrue(true);
        } catch (error) {
          console.error("Error applying filters:", error);
          toast.error("Some error occured!");
        } finally {
          setLoadingFilteredJobs(false);
        }
      }
    } else {
      setLoadingFilteredJobs(true);
      try {
        const response = await getAllJobs(page, limit);
        setJobs(response.jobs);
        setTotalItems(response.totalItems);
        setTotalPages(Math.ceil(response.totalItems / limit));
      } catch (error) {
        console.error("Error applying filters:", error);
        toast.error("Some error occured!");
      } finally {
        setLoadingFilteredJobs(false);
      }
    }
  };
  if(loading){
    return <Loader/>
  }
  return (
    <div
      style={{
        backgroundColor: "#034159",
        margin: "0px",
        paddingTop: "20px",
        paddingBottom: "20px",
        minHeight: "100vh",
      }}
    >
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
        ref={ref}
      ></button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Job Description
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div class="modal-body" style={{ whiteSpace: "pre-wrap" }}>
              {JD}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          fontFamily: "Handlee",
          fontSize: "2rem",
          color: "#fff",
          textAlign: "center",
        }}
      >
        Hi {seekerName}!
      </div>
      <Paper
        sx={{
          padding: "10px",
          width: "80vw",
          margin: "auto",
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "20px",
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
          <label style={{ marginRight: "10px", width: "20%" }}>
            Apply your choices :
          </label>
          <input
            type="text"
            value={searchQuery}
            style={{ flex: "1", width: "60%" }}
            onChange={handleSearchInputChange}
            placeholder="search by role (you can add filters like Job ID, location, salary,...)"
          />
          <i
            class="fa-solid fa-magnifying-glass fa-lg"
            style={{ padding: "10px" }}
            onClick={applyAllFilters}
          ></i>
          <i
            className="fa-solid fa-filter fa-lg"
            style={{ padding: "10px" }}
            onClick={toggleFilter}
          ></i>
        </div>
      </Paper>
      {applyFilter ? (
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
            <label style={{ marginRight: "10px", width: "30%" }}>Job ID:</label>
            <input
              type="text"
              value={jobIdFilter}
              onChange={(e) => setJobIdFilter(e.target.value)}
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
            <label style={{ marginRight: "10px", width: "30%" }}>
              Location:
            </label>
            <input
              type="text"
              value={locationFilter}
              onChange={handleLocationFilterChange}
              style={{ flex: "1", marginLeft: "10px", width: "70%" }}
            />
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <label style={{ marginRight: "10px", width: "30%" }}>Role:</label>
            <input
              type="text"
              value={roleFilter}
              onChange={handleRoleFilterChange}
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
            <label style={{ marginRight: "10px", width: "30%" }}>
              Company Name:
            </label>
            <input
              type="text"
              value={companyNameFilter}
              onChange={handleCompanyNameFilterChange}
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
            <label style={{ marginRight: "10px", width: "30%" }}>
              Job Type:
            </label>
            <select
              value={jobTypeFilter}
              style={{ flex: "1", marginLeft: "10px", width: "70%" }}
              onChange={handleJobTypeFilterChange}
            >
              <option value="">All</option>
              <option value="full-time">Full-time</option>
              <option value="adhoc">Adhoc</option>
              <option value="intern">Intern</option>
            </select>
          </div>
        </Paper>
      ) : (
        <></>
      )}
      {loadingFilteredJobs ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <img src={InfinityLoader} alt="InfinityLoader"></img>
          <h1 style={{ color: "#fff", paddingLeft: "10px" }}>Loading...</h1>
        </div>
      ) : (
        <div
          className="row d-flex justify-content-center"
          style={{ marginRight: "0%" }}
        >
          <div
            style={{
              fontFamily: "Handlee",
              fontSize: "2rem",
              textAlign: "center",
              color: "#fff",
            }}
          >
            {jobs.length === 0 && "No jobs open to display"}
          </div>
          {/* <div style={{width:'80%',margin:'auto'}}> */}
          {isfilterApplied ? (
            filteredJobs && filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                return (
                  <JobTile
                    key={job._id}
                    jobId={job._id}
                    job={job}
                    viewJD={viewJD}
                  />
                );
              })
            ) : (
              <div
                style={{
                  fontFamily: "Handlee",
                  fontSize: "2rem",
                  color: "#fff",
                  textAlign: "center",
                  paddingTop: "3rem",
                }}
              >
                No Matching search results
              </div>
            )
          ) : (
            jobs.map((job) => {
              return (
                <JobTile
                  key={job._id}
                  jobId={job._id}
                  job={job}
                  viewJD={viewJD}
                />
              );
            })
          )}
          {/* </div> */}
          {!loadingFilteredJobs ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-page, & .MuiPaginationItem-ellipsis, & .MuiSvgIcon-root":
                    { color: "#fff" },
                }}
              />
            </div>
          ) : (
            <>Loading</>
          )}
        </div>
      )}
    </div>
  );
};

export default SeekerHomePage;
