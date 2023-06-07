import React,{useState} from 'react'
import JobContext from './jobcontext'

const JobState = (props) => {
    const host = "https://get-to-work.vercel.app";
//     const host = "http://localhost:5000";
    const jobList =[];
    const currSeekerDetailsList =[];
    const [jobs,setJobs]= useState(jobList);
    const [currSeekerDetails,setcurrSeekerDetails]=useState(currSeekerDetailsList);
    const [seekerName,setseekerName]= useState('Job-Seeker');
    const [currRecruiterDetails, setcurrRecruiterDetails] = useState(currSeekerDetailsList);
    const [viewRecruiterDetails, setViewRecruiterDetails] = useState(currSeekerDetailsList);
    const [jobsCreated,setJobsCreated] = useState(currSeekerDetailsList);
    const [myApplications,setMyApplications]=useState(currSeekerDetailsList);
    const [applicationsFetched,setApplicationsFetched] =useState(currSeekerDetailsList)
    const [Applicant, setApplicant] = useState(currSeekerDetailsList)

    // get all jobs
    const getAllJobs = async() =>{
        const response = await fetch(`${host}/api/managejobs/fetchalljobs`,{
          method:'GET',
        })
        const json = await response.json();
        setJobs(json);
    }
    const getCurrSeeker= async()=>{
      const response = await fetch(`${host}/api/auth/getseeker`,{
        method:'GET',
        headers:{
          'auth-token': localStorage.getItem('token')
        },
      })
      const json = await response.json();
      setseekerName(json.fullname);
    }

    const getCurrSeekerAllDetails = async()=>{
      const response = await fetch(`${host}/api/auth/getseeker`,{
        method:'GET',
        headers:{
          'auth-token': localStorage.getItem('token')
        },
      })
      const json = await response.json();
      setcurrSeekerDetails(json);
    }

    const editJobSeekerProfile = async(_id,fullname,email,education,skills,experienceYrs,about,resume,connectionSites)=>{
      const response = await fetch(`${host}/api/manageprofiles/updatejobseekerprofile/${_id}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({fullname,email,education,skills,experienceYrs,about,resume,connectionSites})
      })
      const json = await response.json();
      let profile = JSON.parse(JSON.stringify(currSeekerDetails));
      profile.fullname = fullname;
      profile.email = email;
      profile.education = education;
      profile.skills = skills ;
      profile.experienceYrs = experienceYrs;
      profile.about = about;
      profile.resume = resume ;
      profile.connectionSites = connectionSites;
      setcurrSeekerDetails(profile);
    }

    const getCurrRecruiterAllDetails =async()=>{
      const response = await fetch(`${host}/api/auth/getrecruiter`,{
        method:'GET',
        headers:{
          'auth-token': localStorage.getItem('token')
        },
      })
      const json = await response.json();
      setcurrRecruiterDetails(json);
    }

    const editRecruiterProfile = async(_id,companyName,recruiterName,email,companySize,description,website)=>{
      const response = await fetch(`${host}/api/manageprofiles/updaterecruiterprofile/${_id}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({companyName,recruiterName,email,companySize,description,website})
      })
      const json = await response.json();
      let profile = JSON.parse(JSON.stringify(currRecruiterDetails));
      profile.companyName = companyName;
      profile.email = email;
      profile.recruiterName = recruiterName;
      profile.companySize = companySize ;
      profile.description = description;
      profile.website= website;
      setcurrRecruiterDetails(profile);
    }

    const createdJob=async(role,jobType,nature,salary,duration,skillsets,deadline,numberOfPositions,description,location)=>{
      const response = await fetch(`${host}/api/managejobs/createjob`,{
        method:'POST',
        headers:{
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({role,jobType,nature,salary,duration,skillsets,deadline,numberOfPositions,description,location})
      })
      const job= await response.json();
      setJobs(jobs.concat(job));
    }

    const viewThisRecruiter=async(id)=>{
      const response = await fetch(`${host}/api/manageprofiles/fetchrecruiterprofile/${id}`,{
        method:'GET',
      })
      const json = await response.json();
      setViewRecruiterDetails(json);
    }

    const getJobsCreated=async()=>{
      const response= await fetch(`${host}/api/managejobs/getjobscreated`,{
        method:'GET',
        headers:{
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json();
      setJobsCreated(json);
    }

    const deleteJob = async(id)=>{
      const response = await fetch(`${host}/api/managejobs/deletecreatedjob/${id}`,{
        method:'DELETE',
        headers:{
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json();
      const tempJobList= jobs.filter((job)=>{return job._id!=id});
      const tempCreatedList = jobsCreated.filter((job)=>{return job._id!=id});
      setJobs(tempJobList);
      setJobsCreated(tempCreatedList);
    }

    const editVacancyDetails=async(id,role,jobType,nature,salary,duration,skillsets,deadline,numberOfPositions,description,location)=>{
      const response = await fetch( `${host}/api/managejobs/updatecreatedjob/${id}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({role,jobType,nature,salary,duration,skillsets,deadline,numberOfPositions,description,location})
      })
      const json = await response.json();
    }

    const applyForJob = async(id,resume)=>{
      const response = await fetch(`${host}/api/manageapplications/apply/${id}`,{
        method: 'POST',
        headers:{
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({resume})
      })
      const json = await response.json();
    }

    const fetchAllApplications=async(id)=>{
      const response = await fetch(`${host}/api/manageapplications/fetchallapplications/${id}`,{
        method:'GET',
        headers:{
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json();
      setApplicationsFetched(json);
    }

    const viewApplicant = async(id)=>{
      const response = await fetch(`${host}/api/manageprofiles/fetchjobseekerprofile/${id}`,{
         method:'GET'
      })
      const json = await response.json();
      setApplicant(json);
    }

    const fetchMyApplications=async()=>{
      const response = await fetch(`${host}/api/manageapplications/fetchmyjobs`,{
        method:'GET',
        headers:{
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json();
      setMyApplications(json);
    }
    const deleteApplication=async(id)=>{
      const response = await fetch(`${host}/api/manageapplications/withdrawapplication/${id}`,{
        method:'DELETE',
        headers:{
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json();
      const tempApplicationList= myApplications.filter((application)=>{return application._id!=id});
      setMyApplications(tempApplicationList);
    }
  return (
    <JobContext.Provider value={{myApplications, Applicant,applicationsFetched ,jobsCreated ,seekerName,jobs,currSeekerDetails,currRecruiterDetails,viewRecruiterDetails,getAllJobs,getCurrSeeker,getCurrSeekerAllDetails,editJobSeekerProfile,getCurrRecruiterAllDetails,editRecruiterProfile,createdJob,viewThisRecruiter,getJobsCreated,deleteJob,editVacancyDetails,applyForJob, fetchAllApplications,viewApplicant,fetchMyApplications,deleteApplication}}>
            {props.children}
    </JobContext.Provider>
  )
}

export default JobState;
