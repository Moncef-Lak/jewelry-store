import axios from "axios"; 
import React, { useEffect, useState } from "react";
import AdminNavbar from "./Components/navbar";
import './style.css';
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";
import BijouxElem from "./Components/bijouxItem";
import { GiNecklaceDisplay } from "react-icons/gi";
import { BiLayerPlus } from "react-icons/bi";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const ManagBijoux = () => {
  const {bijouxItems,setIsBijouxItems}= useGlobalContext();
  const [isPageHidden,setIsPageHidden]=useState(true);
  const [itemID,setItemID]=useState(null);
  const [itemImg,setItemImg]=useState('');
  const [itemImgBack,setItemImgBack]=useState('');

  useEffect(()=>{
    setIsBijouxItems(Math.random()*100)
  },[setIsBijouxItems])

  // delete Picture funct
  const delteBijoux=()=>{
      const myObj={id:itemID,image_name:itemImg,image_name2:itemImgBack,type:'delete-bijoux'}
      try {
          axios.post(process.env.REACT_APP_API_PASSWORD+'delete.php',myObj)
          .then(data=>{
              setIsBijouxItems(Math.random()*100);
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
              <div className='confirm' onClick={()=>{delteBijoux();setItemID(null);setItemImg('');setItemImgBack('')}}><FaRegCheckCircle/></div>
            </div>
          </div>  
        </section>
        <div className='header-admin-panel'>
          <div className='left-side'>
            <h1 className='gallery-title'>Bijoux</h1>
            <Link to='/AddBijoux' className='add-item'>
              <h2><BiLayerPlus/></h2>
              <h2>Add Bijoux</h2>
            </Link>
          </div>
          <div className='right-side'>
            <h1><GiNecklaceDisplay/></h1>
            <h2>{bijouxItems.length} Bijoux </h2>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Back Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description	</th>
              <th>Active</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            {bijouxItems.map((item,index)=>{
              return <BijouxElem 
                {...item} 
                index={index} 
                key={item.id}
                setItemImg={setItemImg}
                setItemImgBack={setItemImgBack}
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
 
export default ManagBijoux;

