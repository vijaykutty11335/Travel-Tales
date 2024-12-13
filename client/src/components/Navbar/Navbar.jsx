import React from 'react'
import '../Navbar/Navbar.css'
import { IoSearch } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
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
                <button className='user-initial'>U</button>
                <span className='username'>Username</span>
                </div>
                <div className='logout'>
                    <MdLogout className='logout-icon' title='Logout'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar
