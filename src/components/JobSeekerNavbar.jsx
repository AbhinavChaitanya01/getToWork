import React from 'react'
import {Link} from "react-router-dom";
const JobSeekerNavbar = () => {
  return (
    <div  style={{ paddingLeft:'20%',paddingRight:'20%',display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', paddingBottom:'20px'}} >
      <Link style={{color:"#91F2E9", textDecoration: 'none'}} to='/seekerhomepage'> // Search </Link>
      <Link style={{color:"#91F2E9", textDecoration: 'none'}} to='/myapplications'> // My Applications </Link>
      <Link style={{color:"#91F2E9", textDecoration: 'none'}} to ='/jobseekerprofile'> // My profile </Link>
    </div>
  )
}

export default JobSeekerNavbar
