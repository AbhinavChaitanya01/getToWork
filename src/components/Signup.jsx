import React from 'react'
import "./Signup.css"
import { useState } from 'react';
import {TextField,MenuItem, Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';


const Signup = () => {
    const [credentials, setCredentials] = useState({userType:"",companyname:"",name:"",email: "", password: "",username:""});
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
      e.preventDefault();
      if(credentials.userType==='recruiter'){
        const response = await fetch("https://get-to-work.vercel.app/api/auth/createrecruiter", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({companyName:credentials.companyname, email:credentials.email, password:credentials.password,recruiterName:credentials.name,username:credentials.username})
        });
        const json = await response.json()
        if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authToken); 
          localStorage.setItem('role','recruiter');
          navigate("/recruiterhomepage");
          toast.success("Recruiter account created successfully!");
        }
        else{
          toast.error("Invalid credentials!");
        }
      }else if(credentials.userType==='seeker'){
        const response = await fetch("https://get-to-work.vercel.app/api/auth/createjobseeker", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:credentials.email, password:credentials.password,fullname:credentials.name,username:credentials.username})
        });
        const json = await response.json()
        if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authToken);
          localStorage.setItem('role','jobseeker'); 
          navigate("/seekerhomepage");
          toast.success("Job-seeker account created successfully!");
        }
        else{
          toast.error("Invalid credentials!");
        }
      }else{
        toast.error("Kindly complete the form!");
      }
    }
    const handleChange=(e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='outer-box' style={{minHeight:'100vh'}}>
      <h1 className='login-headertext'>SignUp</h1>
        <div className="sub-box">
        <Paper sx={{padding:"2rem"}}>
            <TextField  sx={{marginBottom:"1rem"}} size='small' label='Select User Type' select value={credentials.userType} name='userType' onChange={handleChange} color="secondary" fullWidth required>
                <MenuItem value='seeker'>Job-Seeker</MenuItem>
                <MenuItem value='recruiter'>Recruiter</MenuItem>
            </TextField>
               {credentials.userType==='recruiter'?<form onSubmit={handleSubmit}>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.companyname} onChange={handleChange} name='companyname' size='small' label='Company Name' color='secondary' helperText='Avoid using abbreviations' fullWidth required/>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.name} onChange={handleChange} name='name' size='small' label='Recruiter name' helperText='Enter your full name' color='secondary' fullWidth required/>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.username} onChange={handleChange} name='username' size='small' label='Username' helperText='Username must be unique' color='secondary' fullWidth required/>
                    <TextField  sx={{marginBottom:"1rem"}} value={credentials.email} onChange={handleChange} name='email' size='small' type='email' label='Email-ID' color='secondary' fullWidth required/>
                    <TextField sx={{marginBottom:"1rem"}} value={credentials.password} onChange={handleChange} name='password' size='small' type = 'password' helperText='Minimum 5 characters' label='Password' color='secondary' fullWidth required/>
                    <button type='submit' className='btn'>SignUp</button>
               </form>:
               <form onSubmit={handleSubmit}>
                    <TextField value={credentials.name}  sx={{marginBottom:"1rem"}} name='name' onChange={handleChange} size='small' label='Your Name' helperText='Enter your full name' color='secondary' fullWidth required/>
                    <TextField value={credentials.username}  sx={{marginBottom:"1rem"}} name='username' onChange={handleChange} size='small' label='Username' helperText='Username must be unique' color='secondary' fullWidth required/>
                    <TextField  value={credentials.email} sx={{marginBottom:"1rem"}} name='email' onChange={handleChange} size='small' type='email' label='Email-ID' color='secondary' fullWidth required/>
                    <TextField value={credentials.password} sx={{marginBottom:"1rem"}} name='password' onChange={handleChange} size='small' type = 'password' helperText='Minimum 5 characters' label='Password' color='secondary' fullWidth required/>
                    <button type='submit' className='btn'>SignUp</button>
               </form>}
        </Paper>
        </div>
    </div>
  )
}

export default Signup
