import React, { useEffect } from 'react'
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';

const navStyle={
    backgroundColor:"#042940"
}
const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    toast.success('Logout successful');
  }
    const scroller =async()=>{
      let faqID=document.getElementById('FAQs');
      window.scrollTo(0,faqID.offsetTop);
    }
    const scroller2 =async()=>{
      let contactEleID=document.getElementById('contact');
      window.scrollTo(0,contactEleID.offsetTop);
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={navStyle} id="Navig">
        <div className=" nav1 container-fluid">
            <img src="logoGtw.png"  alt="Logo" width="50" height="50" className="d-inline-block align-text-top"/>
            <a className="navbar-brand" style={{color:"#91F2E9"}} href="/">getToWork</a>
          <button className="navbar-toggler" style={{ backgroundColor: "#91F2E9"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div  className="navbar-nav">
              <Link className="nav-link active" style={{color:"#91F2E9"}} aria-current="page" to="/">// Home</Link>
              <Link className="nav-link" style={{color:"#91F2E9"}} to="/" onClick={scroller}>// FAQs</Link>
              <Link className="nav-link" style={{color:"#91F2E9"}} to="/" onClick={scroller2}>// Contact Us</Link>
            </div>
          </div>
        </div>
        <div className="nav2 collapse navbar-collapse" id="navbarNavAltMarkup" style={{paddingRight:'10px'}}>
          {!localStorage.getItem('token')?<form className=" nav2 container-fluid justify-content-start d-flex">
                <button className="btn mx-2 my-2" style={{ backgroundColor: "#91F2E9"}} type="button"><Link style={{textDecoration:"none",color:'#000'}} to="/login">Login</Link></button>
                <button className="btn mx-2 my-2" style={{backgroundColor: "#91F2E9"}} type="button"><Link style={{textDecoration:"none",color:'#000'}} to="/signup">Register</Link></button>
            </form>
            :
            <>
            {localStorage.getItem('role')==='recruiter'?
              <div className='navbar-nav flex-grow-1'>
                <div className="navbar-nav container-fluid"><Link className="nav-link" style={{color:"#04BF8A"}} aria-current="page" to='/createjob'>+ new vacancy</Link></div>
                <div className="navbar-nav container-fluid"><Link className="nav-link" style={{color:"#45C4B0"}} aria-current="page" to='/getallcreatedjobs' >My jobs</Link></div>
                <div className="navbar-nav container-fluid"><Link className="nav-link" style={{color:"#9AEBA3"}} aria-current="page" to='/recruiterprofile' >My Profile</Link></div>
                <div className="navbar-nav container-fluid"><Link className="nav-link" style={{color:"#DAFDBA"}} aria-current="page" to='/recruiterhomepage' >Main</Link></div>
              </div>
            :
              <>
              <div className="navbar-nav container-fluid"><Link className="nav-link" style={{color:"#45C4B0"}} aria-current="page" to='/seekerhomepage'>Search</Link></div>
              <div className="navbar-nav container-fluid"><Link className="nav-link" style={{color:"#9AEBA3"}} aria-current="page" to='/myapplications'>My Applications </Link></div>
              <div className="navbar-nav container-fluid"><Link className="nav-link" style={{color:"#DAFDBA"}} aria-current="page" to ='/jobseekerprofile'>My profile </Link></div>
              </>}
              <button onClick={handleLogout} className="btn" style={{backgroundColor: "#91F2E9"}} ><i className="fa-solid fa-right-from-bracket"></i></button>
            </>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
