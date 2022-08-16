import React, { useEffect, useState } from "react";
import {RiAdminFill } from 'react-icons/ri';
import {IoLogOut } from 'react-icons/io5';
import {FaElementor } from 'react-icons/fa';
import {GiCutDiamond} from 'react-icons/gi';
import {AiFillHome } from 'react-icons/ai';
import {MdContactMail, MdPhotoLibrary } from 'react-icons/md';
import { NavLink, Redirect } from "react-router-dom";


const AdminNavbar = () => {
  const [redirect,setRedirect]=useState(false);
  
  useEffect(()=>{
    if (!localStorage.getItem('UserData')) {
      setRedirect(true);
    }
    else{
      // console.log(JSON.stringify(localStorage.getItem('UserData')));
    }
  },[])
  
  if (redirect) {
    return (<Redirect to='/login'/>)
  }

  return(
    <>
      <section className='navbar-admin' >
          <NavLink to='/home' className='box-content'>
            <div className='left-side'><AiFillHome/></div>
            <div className='right-side'><h1>Home</h1></div>
          </NavLink >
          
          <NavLink className='box-content' to='/admin'>
            <div className='left-side'><RiAdminFill/></div>
            <div className='right-side'><h1>Admin</h1></div>
          </NavLink>
          
          <NavLink to='/categories'  className='box-content'>
            <div className='left-side'><FaElementor/></div>
            <div className='right-side'><h1>Categories</h1></div>
          </NavLink>

          <NavLink to='/gallery'  className='box-content'>
            <div className='left-side'><MdPhotoLibrary/></div>
            <div className='right-side'><h1>Gallery</h1></div>
          </NavLink>

          <NavLink to='/bijoux' className='box-content'>
            <div className='left-side'><GiCutDiamond/></div>
            <div className='right-side'><h1>Store</h1></div>
          </NavLink>

          <NavLink to='/orders' className='box-content'>
            <div className='left-side'><MdContactMail/></div>
            <div className='right-side'><h1>Contact</h1></div>
          </NavLink>

          <div onClick={()=>{localStorage.setItem('UserData','');setRedirect(true)}} className='box-content' >
            <div className='left-side'><IoLogOut/></div>
            <div className='right-side'><h1>Logout</h1></div>
          </div>
      </section>
    </>
  )
}
 
export default AdminNavbar;

