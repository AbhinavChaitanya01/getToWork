import React from 'react'
import {Link} from "react-router-dom";

const recruiterHomePage = () => {
  return (
    <div style={{backgroundColor:'#034159',minHeight:'100vh',paddingTop:'20px'}}>
      <p style={{fontFamily:'Sacramento',fontSize:'3rem',textAlign:'center',fontWeight:'700',color:'#F27405'}}>Welcome &nbsp; to &nbsp; getToWork!</p>
      <p style={{fontFamily:'Handlee',fontSize:'1.5rem',color:'#fff',textAlign:'center'}}>Start recruiting now...</p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <button
          style={{
            backgroundColor: '#008F8C',
            color: '#fff',
            fontFamily: 'Handlee',
            fontSize: '1rem',
            borderRadius: '10px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#000',
            padding: '5px',
            width: '200px',
            boxSizing: 'border-box',
          }}
        >
          <Link className="nav-link" style={{}} aria-current="page" to='/createjob'>Create new vacancy</Link>
        </button>
        <button
          style={{
            backgroundColor: '#008F8C',
            color: '#fff',
            fontFamily: 'Handlee',
            fontSize: '1rem',
            borderRadius: '10px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#000',
            padding: '5px',
            width: '200px',
            boxSizing: 'border-box',
          }}
        >
          <Link className="nav-link" style={{}} aria-current="page" to='/getallcreatedjobs'>Created Jobs</Link>
        </button>
        <button
          style={{
            backgroundColor: '#008F8C',
            color: '#fff',
            fontFamily: 'Handlee',
            fontSize: '1rem',
            borderRadius: '10px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#000',
            padding: '5px',
            width: '200px',
            boxSizing: 'border-box',
          }}
        >
          <Link className="nav-link" style={{}} aria-current="page" to='/recruiterprofile'>My Profile</Link>
        </button>
      </div>
    </div>
  )
}

export default recruiterHomePage
