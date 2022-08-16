import axios from "axios";
import React, { useEffect, useState} from "react";
import AdminNavbar from "./Components/navbar";
import {IoPersonAddSharp} from 'react-icons/io5';
import {RiAdminFill } from 'react-icons/ri';
import './style.css';
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";
import Person from "./Components/adminItem";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const ManagAdmin = () => {
  const {adminItems,setIsAdminItems}= useGlobalContext();
  const [isPageHidden,setIsPageHidden]=useState(true);
  
  const [itemID,setItemID]=useState(null);
  
  useEffect(()=>{
    setIsAdminItems(Math.random()*100)
  },[setIsAdminItems])
  


  const delteAdmin=()=>{
    const myObj={id:itemID,type:'delete-admin'}
      try {
          axios.post(process.env.REACT_APP_API_PASSWORD+'delete.php',myObj)
          .then(data=>{
              setIsAdminItems(Math.random()*100);
              if (data.data==='ok') {
                  // console.log('noooooooooooooooooooooooooooo')
              }
              if (data.data==='faild') {
                  // console.log('noooooooooooooooooooooooooooo')
              }
          })
      } catch (error) {
          console.log(error)
      }
  }

  return(
    <>
      <AdminNavbar/>
      <section className='admin-panel' >
        
        <section className={`confirm-page ${isPageHidden && 'confirm-page-hidden'}`} onClick={()=>setIsPageHidden(true)}>
          <div className='confirm-box'>
            <h3>Confirm Your Order</h3>
            <div className='confirm-buttons'>
              <div className='cancel' onClick={()=>setIsPageHidden(true)}><FaRegTimesCircle/></div>
              <div className='confirm' onClick={()=>{delteAdmin();setItemID(null)}}><FaRegCheckCircle/></div>
            </div>
          </div>  
        </section>

        <div className='header-admin-panel'>
          <div className='left-side'>
            <h1>Admin</h1>
            <Link to='/AddAdmin' className='add-item'>
              <h2><IoPersonAddSharp/></h2>
              <h2>Add Admin</h2>
            </Link>
          </div>
          <div className='right-side'>
            <h1><RiAdminFill/></h1>
            <h2>{adminItems.length} ADMIN</h2>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>

            {adminItems.map((item,index)=>{
              return <Person 
                  {...item}
                  setItemID={setItemID}  
                  setIsPageHidden={setIsPageHidden} 
                  index={index} 
                  key={item.id}
                />
            })}
          </tbody>
        </table>
      </section>
    </>
  )
}
 
export default ManagAdmin;

