import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "./Components/navbar";
import img2 from '../images/undraw_feeling_proud_qne1.svg';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {BiError} from 'react-icons/bi';
import { Link,  useHistory } from "react-router-dom";
import axios from "axios";
import { MdDoNotDisturbOn } from "react-icons/md";
import { useForm ,} from "react-hook-form";


const AddAdmin = () => {
  const {push}=useHistory();



  const [msgShowing,setMsgShowing]=useState(false);
  
  const {register,handleSubmit,watch,formState: { errors }}=useForm();

  
  const handleSubmit2=(data)=>{
    const myObj={name:data.name,username:data.username,password:data.password,type:'add-admin'};
    try {
      axios.post(process.env.REACT_APP_API_PASSWORD+'add.php',myObj)
      .then(push('./admin'))
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

  const password = useRef({});
  password.current = watch("password", "");
  return(
    <>
      <AdminNavbar/>
      <section className='add-admin-page'>
        <div className={`add-msg ${msgShowing && 'inshowing'}`}>
          <h1><MdDoNotDisturbOn/></h1>
          <h2>Fail To Add Admin</h2>
        </div>
        <div className='in-add-admin'>
          <section className='left-side'>
            <img src={img2} alt='img'/>
          </section>
          <section className='right-side'>
            <form onSubmit={handleSubmit(handleSubmit2)}>
                <input  
                  type='text' 
                  placeholder='name' 
                  {...register('name', { required: ' This is Required' ,minLength:3} )}
                />
                {/* <ErrorMessage errors={errors} name='name' as={<p> <BiError/> This is Required</p>} /> */}
                {errors.name && errors.name.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.name && errors.name.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}
                
                <input  type='text'  placeholder='UserName' {...register('username', { required: true ,minLength:3})}/>
                {errors.username && errors.username.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.username && errors.username.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}
                
                <input  type='password' placeholder='Password' {...register('password', { required: true ,minLength:5,maxLength:15})}/>          
                {errors.password && errors.password.type === 'required' && (<p><BiError/> You must specify a password </p>)}
                {errors.password && errors.password.type === 'minLength' && (<p><BiError/> Password must have at least 5 characters </p>)}
                {errors.password && errors.password.type === 'maxLength' && (<p><BiError/> Password must have at the most 15 characters </p>)}
                
                <input  type='password' placeholder='Confirm Password' 
                  {...register('confirmPassword',{
                    validate: value =>
                      value === password.current || "The passwords do not match"
                  })}
                />
                {errors.confirmPassword && <p><BiError/> The passwords do not match</p>}
                
                <input  type='submit' value='Add' className='btn-add' 
                
                />
            </form>
            <Link to='/admin'><h2>Return to Admin <AiOutlineArrowRight className='aroow-right'/></h2></Link>
          </section>
        </div>
      </section>
    </>
  )
}
 
export default AddAdmin;

