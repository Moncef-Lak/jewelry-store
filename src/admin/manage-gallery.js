import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./Components/navbar";
import {IoDuplicate} from 'react-icons/io5';
import './style.css';
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";
import { BiPhotoAlbum } from "react-icons/bi";
import GalleyElem from "./Components/galleryItem";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const ManagCategory = () => {
  const {galleryItems,setIsGalleryItems}= useGlobalContext();
  const [isPageHidden,setIsPageHidden]=useState(true);
  const [itemID,setItemID]=useState(null);
  const [itemImg,setItemImg]=useState('');
  
  useEffect(()=>{
    setIsGalleryItems(Math.random()*100)
  },[setIsGalleryItems])

  const deltePicture=()=>{
    const myObj={id:itemID,image_name:itemImg,type:'delete-picture'}
    try {
        axios.post(process.env.REACT_APP_API_PASSWORD+'delete.php',myObj)
        .then(data=>{
            setIsGalleryItems(Math.random()*100);
            if (data.data==='ok') {
                // console.log('noooooooooooooooooooooooooooo')
            }
            if (data.data==='faild') {
                // console.log(data.data);
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
              <div className='confirm' onClick={()=>{deltePicture();setItemID(null);setItemImg('')}}><FaRegCheckCircle/></div>
            </div>
          </div>  
        </section>
        <div className='header-admin-panel'>
          <div className='left-side'>
            <h1 className='gallery-title'>Gallery</h1>
            <Link to='/AddPicture' className='add-item'>
              <h2><IoDuplicate/></h2>
              <h2>Add Picture</h2>
            </Link>
          </div>
          <div className='right-side'>
            <h1><BiPhotoAlbum/></h1>
            <h2>{galleryItems.length} Picture(s) </h2>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Active</th>
              <th>favourite</th>
              <th>Actions</th>
            </tr>
            {galleryItems.map((item,index)=>{
              return <GalleyElem 
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
 
export default ManagCategory;

