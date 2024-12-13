import React from 'react'
import '../Signup/Signup.css'

const Signup = () => {
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

                    <div className='signup-right'>
                        <div className='signup-header'>
                            <h2>Signup</h2>
                        </div>
                        <div className='signup-inputs'>
                            <input type="text" placeholder='Name' />
                            <input type="text" placeholder='Email'/>
                            <input type="password" placeholder='Password' />
                            <input type="password" placeholder='Confirm Password' />
                        </div>
                        {/* <div className='error-container'>
                            <span>Please enter a valid email address</span>
                        </div> */}
                        <div className='signup-btn'>
                            <button>CREATE ACCOUNT</button>
                        </div>
                        <div className='login-link'>
                        <span>Don't have Account ? <a href="#">Login</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
