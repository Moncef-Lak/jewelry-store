import React, { useEffect, useState } from "react";
import AdminNavbar from "./Components/navbar";
import img2 from '../images/undraw_Logic_re_nyb4.svg';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {HiOutlineClipboardList} from 'react-icons/hi';
import {BiError} from 'react-icons/bi';
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { MdCancel, MdDoNotDisturbOn } from "react-icons/md";
import { useForm ,} from "react-hook-form";
import { useGlobalContext } from "../contexts/adminContext";
import errorImage from './../images/not-found-image.jpg'


const UpdateBijoux = () => {

  
  const [isListBeforShowing,setIsListBeforShowing]=useState(false);
  const [msgShowing,setMsgShowing]=useState(false);
  const {id}=useParams();
  const {push}=useHistory();
  const [imgUrl,setImgUrl]=useState(null);
  const [backImgUrl,setBackImgUrl]=useState(null);
  const {bijouxItems,setIsBijouxItems}=useGlobalContext()
  const BijouxItem=bijouxItems.filter(item=>item.id===id);
  // console.log(adminUserItem);
  const {register,handleSubmit,setValue,formState: { errors }}=useForm();
  // chek we have an item 
  useEffect(()=>{
    if (BijouxItem.length<1) {
      push('../bijoux')
    }
  },[BijouxItem.length,push])
  
  const handleSubmit2=(data)=>{
    if (!data.imageName[0] && !data.backImageName[0] && !data.name && !data.description && !data.active && !data.price ) {
      push('../bijoux')
    }
    const myObj=new FormData();

    myObj.append('name',data.name ? data.name : BijouxItem[0].name);
    myObj.append('price',data.price ? data.price : BijouxItem[0].price);
    myObj.append('description',data.description ? data.description : BijouxItem[0].description);
    myObj.append('image',data.imageName[0] ? data.imageName[0] : BijouxItem[0].image_name);
    myObj.append('back_image',data.backImageName[0] ? data.backImageName[0] : BijouxItem[0].image_name2);
    myObj.append('image_before',BijouxItem[0].image_name);
    myObj.append('back_image_before',BijouxItem[0].image_name2);
    myObj.append('active',data.active ? data.active : BijouxItem[0].active);
    myObj.append('id',BijouxItem[0].id);  
    myObj.append('type','update-bijoux');  
    
    if (!data.imageName[0] && !data.backImageName[0] && !data.name && !data.description && !data.active && !data.price ) {
      push('../bijoux')
    }
    else{
      try {
        axios.post(process.env.REACT_APP_API_PASSWORD+'update.php',myObj)
        .then(data=>{
          if (data.data==='ok') {
            setIsBijouxItems(Math.random()*100)
            push('../bijoux');          
          }
          if (data.data==='faild to upload image') {
            setMsgShowing(true);          
            console.log("faild to upload image")     
            window.scrollTo(0, 0);
          }
          else{
            setMsgShowing(true);
            window.scrollTo(0, 0);
          }
        })
      } catch (error) {
        console.log(error);
        setMsgShowing(true);
        window.scrollTo(0, 0);
      }      
    }
  }
  
  useEffect(()=>{
    let hiddenMsg =setTimeout(()=>{
      setMsgShowing(false)
    },3000)
    return ()=>clearTimeout(hiddenMsg);
  },[msgShowing])

  const image_name=BijouxItem[0] ? BijouxItem[0].image_name : "Error";
  const image_name_back=BijouxItem[0] ? BijouxItem[0].image_name2 : "Error";

  useEffect(()=>{
    try {
      if (require('../images/bijoux-image/'+image_name)) {
          setImgUrl(require('../images/bijoux-image/'+image_name).default)
      } 
    } catch (error) {
      setImgUrl(errorImage)
    }

    try {
      if (require('../images/bijoux-image/'+image_name_back)) {
        setBackImgUrl(require('../images/bijoux-image/'+image_name_back).default)
      } 
    } catch (error) {
      setBackImgUrl(errorImage)
    }

  },[image_name,image_name_back])
  
  return(
    <>
      <AdminNavbar/>
      <section className='add-admin-page'>
        <div className={`add-msg ${msgShowing && 'inshowing'}`}>
          <h1><MdDoNotDisturbOn/></h1>
          <h2>Fail To Update Or Upload Bijoux</h2>
        </div>
        <div className='in-add-admin'>
          <section className='left-side'>
            <img src={img2} alt='img' style={{width:"80%",}}/>
          </section>
          <section className='right-side'>
            <h3 className='update-title update-title2' onClick={()=>setIsListBeforShowing(true)}><HiOutlineClipboardList/></h3>
            <h3 className='update-title'>Update-Bijoux </h3>

            {/* List Before */}
            <div className={` list-before ${isListBeforShowing && 'showing-list-before'}`}>
              <h6 onClick={()=>setIsListBeforShowing(false)}><MdCancel/></h6>
              <h2><HiOutlineClipboardList className='list-items-logo'/> </h2>
              <div className='list-before-box'>
                <h2>ID:</h2>
                <h4>{BijouxItem[0] && BijouxItem[0].id}</h4>
              </div>
              <div className='list-before-box'>
                <h2>Name :</h2>
                <h4>{BijouxItem[0] && BijouxItem[0].name}</h4>
              </div>
              <div className='list-before-box'>
                <h2>Description :</h2>
                <h4>{BijouxItem[0] && (BijouxItem[0].description.length>20 ? BijouxItem[0].description.substring(0,20)+"...":BijouxItem[0].description)}</h4>
              </div>
              <div className='list-before-box'>
                <h2>Price :</h2>
                <h4>{BijouxItem[0] && BijouxItem[0].price}</h4>
              </div>
              <div className='list-before-box'>
                <h2>Category Id :</h2>
                <h4>{BijouxItem[0] && BijouxItem[0].category_id}</h4>
              </div>
              <div className='list-before-box'>
                <h2>Active :</h2>
                <h4>{BijouxItem[0] && BijouxItem[0].active}</h4>
              </div>
              <div className='list-before-box'>
                <h2>Image :</h2>
                <h4><img src={BijouxItem[0] && imgUrl} alt='img'/></h4>
              </div>
              <div className='list-before-box'>
                <h2>Back Image :</h2>
                <h4><img src={BijouxItem[0] && backImgUrl} alt='img'/></h4>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleSubmit2)}>
                <input  type='text'  placeholder='Title' {...register('name', { required: false, minLength:3})}/>
                {errors.name && errors.name.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}

                <input  type='number'  placeholder='Price' {...register('price', { required: false })}/>

                <textarea rows='1'  type='text'  placeholder='Description...' {...register('description', { required:false ,minLength:3})}/>
                {errors.description && errors.description.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}
                                
                <div className='radio-box'>
                  <h3>Active</h3> 
                 <div className='radio-in'><input type="radio"  {...register('active', { required: false })} value="Yes"></input> Yes </div>
                 <div className='radio-in'><input type="radio"   {...register('active', { required: false })} value="No" /> No</div>
                </div>

                <input  type='file' onChange={e=>setValue('imageName', e.target.value.files)}  placeholder='image' 
                  {...register('imageName', { required: false,
                    validate: value =>{
                      if (value[0]) {
                        return value[0].size/1024 < 500  || "Size must Be at the most 0.5 Mo"
                      }
                    }
                  })}
                />
                <p style={{color:"#36837E"}}>Image</p>
                {errors.imageName && errors.imageName.type === 'validate' && (<p><BiError/> Size must Be at the most 0.5 Mo</p>)}

                <input  type='file' placeholder='Back Image' onChange={e=>setValue('backImageName', e.target.value.files)}   
                  {...register('backImageName', { required: false,
                    validate: value =>{
                      if (value[0]) {
                        return value[0].size/1024 < 500  || "Size must Be at the most 0.5 Mo"
                      }
                    }
                  })}
                />
                <p style={{color:"#36837E"}}>Back Image</p>
                {errors.backImageName && errors.backImageName.type === 'validate' && (<p><BiError/> Size must Be at the most 0.5 Mo</p>)}
                
                                
                <input  type='submit' value='Update' className='btn-add' />
            </form>
            <Link to='/bijoux'><h2>Return to Store <AiOutlineArrowRight className='aroow-right'/></h2></Link>
          </section>
        </div>
      </section>
    </>
  )
}
 
export default UpdateBijoux;

