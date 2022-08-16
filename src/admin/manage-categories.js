import axios from "axios"; 
import React, { useEffect, useState} from "react";
import AdminNavbar from "./Components/navbar";
import {IoDuplicate} from 'react-icons/io5';
import './style.css';
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";
import CategoryElem from "./Components/categoryItem";
import {  HiOutlineDuplicate } from "react-icons/hi";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const ManagGallery = () => {
  const {categoryItems,setIsCategoryItems}= useGlobalContext();
  const [isPageHidden,setIsPageHidden]=useState(true);
  const [itemID,setItemID]=useState(null);
  const [itemImg,setItemImg]=useState('');

  useEffect(()=>{
    setIsCategoryItems(Math.random()*100)
  },[setIsCategoryItems])

  const delteCategory=()=>{
    const myObj={id:itemID,image_name:itemImg,type:'delete-category'}
    try {
        axios.post(process.env.REACT_APP_API_PASSWORD+'delete.php',myObj)
        .then(data=>{
            setIsCategoryItems(Math.random()*100);            
            if (data.data==='faild') {
                console.log(data.data);
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
              <div className='confirm' onClick={()=>{delteCategory();setItemID(null);setItemImg('')}}><FaRegCheckCircle/></div>
            </div>
          </div>  
        </section>
        <div className='header-admin-panel'>
          <div className='left-side'>
            <h1 className='category-title'>Categories</h1>
            <Link to='/AddCategory' className='add-item'>
              <h2><IoDuplicate/></h2>
              <h2>Add Category</h2>
            </Link>
          </div>
          <div className='right-side'>
            <h1><HiOutlineDuplicate/></h1>
            <h2>{categoryItems.length} Category </h2>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
            {categoryItems.map((item,index)=>{
              return <CategoryElem 
                {...item} 
                index={index} 
                key={item.id}
                setItemImg={setItemImg}
                setItemID={setItemID} 
                setIsPageHidden={setIsPageHidden}
              />
            })}
          </tbody>
        </table>
      </section>
    </>
  )
}
 
export default ManagGallery;

