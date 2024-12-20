import React, { useEffect, useState } from 'react'
import '../Navbar/Navbar.css'
import { IoSearch } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const [name, setName] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const decodeToken = JSON.parse(atob(token.split('.')[1]));
        setName(decodeToken.name);
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

  return (
    <>
        <div className='nav-container'>
            <div className='nav-logo'>
                <span>Travel Tales</span>
            </div>
            <div className='search-group'>
                <input type="text"placeholder='Search Tales...' />
                <IoSearch className='search-icon'/>
            </div>
            <div className='nav-user'>
                <div className='profile'>
                <button className='user-initial'>{name.charAt(0).toUpperCase()}</button>
                <span className='username'>{name}</span>
                </div>
                <div className='logout'>
                    <MdLogout className='logout-icon' title='Logout' onClick={handleLogout}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar