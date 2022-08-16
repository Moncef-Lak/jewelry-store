import React, { useEffect, useState } from "react";
import AdminNavbar from "./Components/navbar";
import img2 from '../images/undraw_Sync_files_re_ws4c.svg';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {HiOutlineClipboardList} from 'react-icons/hi';
import {BiError} from 'react-icons/bi';
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { MdCancel, MdDoNotDisturbOn } from "react-icons/md";
import { useForm ,} from "react-hook-form";
import { useGlobalContext } from "../contexts/adminContext";
const sha1 = require('sha1');

const UpdateAdmin = () => {

  
  const [isListBeforShowing,setIsListBeforShowing]=useState(false);
  const [msgShowing,setMsgShowing]=useState(false);
  const {id}=useParams();
  const {push}=useHistory();
  const {adminItems}=useGlobalContext()
  const adminUserItem=adminItems.filter(item=>item.id===id);
  // console.log(adminUserItem);
  const {register,handleSubmit,formState: { errors }}=useForm();
  // chek we have an item 
  useEffect(()=>{
    if (adminUserItem.length<=0) {
      push('../admin')
    }
  })
  
  const handleSubmit2=(data)=>{
    // console.log(data);
    const myObj={name:data.name,username:data.username,id:adminUserItem[0].id,type:'update-admin'}
    try {
      axios.post(process.env.REACT_APP_API_PASSWORD+'update.php',myObj)
      .then(data=>{push('../admin')})
    } catch (error) {
      console.log(error);
      setMsgShowing(true);
    }      
  }
  
  useEffect(()=>{
    let hiddenMsg =setTimeout(()=>{
      setMsgShowing(false)
    },3000)
    return ()=>clearTimeout(hiddenMsg);
  },[msgShowing])

  return(
    <>
      <AdminNavbar/>
      <section className='add-admin-page'>
        <div className={`add-msg ${msgShowing && 'inshowing'}`}>
          <h1><MdDoNotDisturbOn/></h1>
          <h2>Fail To Update Admin</h2>
        </div>
        <div className='in-add-admin'>
          <section className='left-side'>
            <img src={img2} alt='img'/>
          </section>
          <section className='right-side'>
            <h3 className='update-title update-title2' onClick={()=>setIsListBeforShowing(!isListBeforShowing)}><HiOutlineClipboardList/></h3>
            <h3 className='update-title'>Update-Admin </h3>

            {/* List Before */}
            <div className={` list-before ${isListBeforShowing && 'showing-list-before'}`}>
              <h6 onClick={()=>setIsListBeforShowing(false)}><MdCancel/></h6>
              <h2><HiOutlineClipboardList className='list-items-logo'/> </h2>
              <div className='list-before-box'>
                <h2>ID:</h2>
                <h4>{adminUserItem[0] && adminUserItem[0].id}</h4>
              </div>
              <div className='list-before-box'>
                <h2>Name Before:</h2>
                <h4>{adminUserItem[0] && adminUserItem[0].name} </h4>                    
              </div>
              <div className='list-before-box'>
                <h2>Username Before:</h2>
                <h4>{adminUserItem[0] && adminUserItem[0].username}</h4>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleSubmit2)}>
                <input  
                  type='text'                   
                  placeholder='New Name' 
                  {...register('name', { required: ' This is Required' ,minLength:3} )}
                />
                {/* <ErrorMessage errors={errors} name='name' as={<p> <BiError/> This is Required</p>} /> */}
                {errors.name && errors.name.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.name && errors.name.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}
                
                <input  type='text'  placeholder='New UserName' {...register('username', { required: true ,minLength:3})}/>
                {errors.username && errors.username.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.username && errors.username.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}
                
                <input  type='password' placeholder='Your Password' 
                  {...register('password', { required: true ,minLength:5,maxLength:15,
                    validate: value =>
                    sha1(value) === adminUserItem[0].password || "The passwords do not match"
                  })}
                />          
                {errors.password && errors.password.type === 'required' && (<p><BiError/> You must specify a password</p>)}
                {errors.password && errors.password.type === 'minLength' && (<p><BiError/> Password must have at least 5 characters</p>)}
                {errors.password && errors.password.type === 'maxLength' && (<p><BiError/> Password must have at the most 15 characters</p>)}
                {errors.password && errors.password.type === 'validate' &&<p><BiError/> The passwords do not match</p>}
                
                <input  type='submit' value='Update' className='btn-add' />
            </form>
            <Link to='/admin'><h2>Return to Admin <AiOutlineArrowRight className='aroow-right'/></h2></Link>
          </section>
        </div>
      </section>
    </>
  )
}
 
export default UpdateAdmin;

