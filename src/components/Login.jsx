import React, { useState } from 'react'
import "./Login.css"
import {TextField,MenuItem, Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import  toast  from 'react-hot-toast';

const Login = () => {
  // const [userType,setUserType]=useState('');

  const [credentials, setCredentials] = useState({userType:"",email: "", password: ""});
  let navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.userType==='recruiter'){
      const response = await fetch("https://get-to-work.vercel.app/api/auth/recruiterlogin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken); 
        localStorage.setItem('role', 'recruiter');
        navigate("/recruiterhomepage");
        toast.success('Logged in successfully!');
      }
      else{
        toast.error('invalid credentials');
      }
    }
    else if (credentials.userType==='seeker'){
      const response = await fetch("https://get-to-work.vercel.app/api/auth/jobseekerlogin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken); 
        localStorage.setItem('role', 'jobseeker');
        navigate("/seekerhomepage");
        toast.success('Logged in successfully!');
      }
      else{
        toast.error("invalid credentials");
      }
    }
    else{
      toast.error('Kindly complete the form');
    }
  }

  const handleChange=(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
    console.log(e.target.name);
    console.log(e.target.value);
  }
  return (
    <div className='loginbox'>
      <h1 className='login-headertext'>Login</h1>
      <div className='sub-box'>    
        <Paper sx={{padding:"2rem"}}>
        <form onSubmit={handleSubmit} >
          <TextField size='small' sx={{marginBottom:"2rem"}} label='Select User Type' select value={credentials.userType} name='userType' onChange={handleChange} color="secondary" fullWidth required>
            <MenuItem value='seeker'>Job-Seeker</MenuItem>
            <MenuItem value='recruiter'>Recruiter</MenuItem>
          </TextField>
          <TextField size='small' sx={{marginBottom:"2rem"}} onChange={handleChange} value={credentials.email} name='email' type='email' label='Registered Email-ID' color='secondary' fullWidth required/>
          <TextField size='small' sx={{marginBottom:"2rem"}} onChange={handleChange} value={credentials.password} name='password' type = 'password'  label='Password' color='secondary' fullWidth required/>
          <button type="submit" className="btn">Login</button>
        </form>
        </Paper>
      </div>
    </div>
  )
}

export default Login
