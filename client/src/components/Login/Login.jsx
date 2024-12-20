import React, { useState } from 'react'
import '../Login/Login.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [formdata, setFormdata] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormdata({...formdata, [e.target.name] : e.target.value});
    }

    const handleSubmit = async() => {
        try{
            const res = await axios.post('http://localhost:3000/api/user/login', formdata);
            toast.success("Logged in successfully!");
            const token = res.data.token;
            localStorage.setItem("token", token);
            console.log("token", token);
            setTimeout(() => {
                navigate('/travelTales')
            }, 3000);
            setError("");

        } catch( error) { 
            setError(error.response?.data?.message || "An error occured");
        }
    }

    const hanldeKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleSubmit(e);
        }
    }

  return (
    <>
    <div className='login-maincontainer'>
        <img className='bg-img2' src="./samples/bg-2.jpeg" alt="bg-img" />
        <div className='login-subcontainer'>
            <div className='login-left'>
                <img src="./samples/natureImg-AI-2.jpeg" alt="natureImg" />
                <div className='welcome-text2'>
                    <h2>See the world through new eyes</h2>
                    <span>Create an account to start documenting your travels and memories in your personal travel journal.</span>
                </div>
            </div>

            <div className='login-right' onKeyDown={hanldeKeyPress}>
                <div className='login-header'>
                    <h2>Login</h2>
                </div>
                <div className='login-inputs'>
                    <input type="text" name='email' placeholder='Email' value={formdata.email} onChange={handleChange} required/>
                    <input type="password" name='password' placeholder='Password' value={formdata.password} onChange={handleChange} required/>
                </div>
                { error && <div className='error-container2'>
                    <span>{error}</span>
                </div>}
                <div className='login-btn'>
                    <button type='submit' onClick={handleSubmit}>LOGIN</button>
                </div>
                <div className='signup-link'>
                    <span>Don't have an Account ? <Link to="/">Signup</Link></span>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
    </>
  )
}

export default Login
