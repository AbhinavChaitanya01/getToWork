import React from 'react'
import { Link } from 'react-router-dom'

const RecruiterNavbar = () => {
  return (
    <div style={{ paddingLeft:'20%',paddingRight:'20%',display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', paddingBottom:'20px'}}>
      <Link to='/createjob' style={{ color: '#91F2E9', textDecoration: 'none' }}>+ new vacancy</Link>
      <Link to='/getallcreatedjobs' style={{ color: '#91F2E9', textDecoration: 'none' }}>// My jobs</Link>
      <Link to='/recruiterprofile' style={{ color: '#91F2E9', textDecoration: 'none' }}>// My Profile</Link>
      <Link to='/recruiterhomepage' style={{ color: '#91F2E9', textDecoration: 'none' }}>// Main</Link>
    </div>
  )
}

export default RecruiterNavbar

