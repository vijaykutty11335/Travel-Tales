import React, { useState } from 'react'
import '../Signup/Signup.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
             return setError("Password mismatched!");
        }

        if (formData.password.length < 6) {
             return setError("Password must be contains atleast six characters");
        }
        setError("");

        try {
            await axios.post('http://localhost:3000/api/user/signup', formData);
            toast.success("Registered successfully!");
            setTimeout(() => {
                navigate('/login')
            }, 3000);

        } catch (error) {
            setError(error.response?.data?.message || "An error occured");
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleSubmit(e);
        }
    }

    return (
        <>
            <div className='signup-maincontainer'>
                <img className='bg-img' src="./samples/bg-2.jpeg" alt="bg" />
                <div className='signup-subcontainer'>
                    <div className='signup-left'>
                        <img src="./samples/natureImg-AI.jpeg" alt="nature-img" />
                        <div className='welcome-text'>
                            <h2>Adventure Awaits, Go Find It</h2>
                            <span>Create an account to start documenting your travels and preserving your memories in your personal travel journal.</span>
                        </div>

                    </div>

                    <form className='signup-right' onKeyDown={handleKeyPress}>
                        <div className='signup-header'>
                            <h2>Signup</h2>
                        </div>
                        <div className='signup-inputs'>
                            <input type="text" name='name' placeholder='Name' value={formData.name} onChange={handleChange} required/>
                            <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange} required/>
                            <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} required/>
                            <input type="password" name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required/>
                        </div>
                        {error && <div className='error-container'>
                            <span>{error}</span>
                        </div>}
                        <div className='signup-btn'>
                            <button onClick={handleSubmit}>CREATE ACCOUNT</button>
                        </div>
                        <div className='login-link'>
                            <span>Already have an Account ? <Link to="/login">Login</Link></span>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signup
