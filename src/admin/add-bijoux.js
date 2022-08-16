import React, { useEffect, useState } from "react";
import AdminNavbar from "./Components/navbar";
import img2 from '../images/undraw_jewelry_iima.svg';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {BiError} from 'react-icons/bi';
import { Link,   useHistory } from "react-router-dom";
import axios from "axios";
import { MdDoNotDisturbOn } from "react-icons/md";
import { useForm ,} from "react-hook-form";
import { useGlobalContext } from "../contexts/adminContext";


const AddBijoux = () => {
  const {push}=useHistory();
  const {categoryItems}=useGlobalContext();
  const [msgShowing,setMsgShowing]=useState(false);
  const [msg,setMsg]=useState(null);
  const mapCategory=categoryItems.map(item=>{return {category:item.name,id:item.id}})

  const {register,handleSubmit, setValue,formState: { errors }}=useForm();


  const handleSubmit2=(data)=>{
    const myObj=new FormData();    
    myObj.append('image',data.imageName[0],data.imageName[0].name);
    myObj.append('back-image',data.backImageName[0],data.backImageName[0].name);
    myObj.append('description',data.description);
    myObj.append('price',data.price);
    myObj.append('category_id',data.category);
    myObj.append('name',data.name);
    myObj.append('active',data.active);
    myObj.append('type','add-bijoux');  

    try {
      axios.post(process.env.REACT_APP_API_PASSWORD+'add.php',myObj)
      .then(data=>{
        // console.log(data.data)
        if (data.data==='ok') {
          push('./bijoux')
        }
        if (data.data==='faild') {
          setMsgShowing(true);      
          setMsg('Fail To Add Bijoux');  
          window.scrollTo(0, 0);
        }
        if (data.data==='faild to upload image') {
          setMsgShowing(true);      
          setMsg('Fail to upload image');
          window.scrollTo(0, 0);
        }
      })
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
          <h2>{msg}</h2>
        </div>
        <div className='in-add-admin'>
          <section className='left-side'>
            <img src={img2} alt='img' style={{width:"70%"}}/>
          </section>
          <section className='right-side'>
            <form onSubmit={handleSubmit(handleSubmit2)} >
                <input  type='text'  placeholder='Title' {...register('name', { required: true ,minLength:3})}/>
                {errors.name && errors.name.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.name && errors.name.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}

                <input  type='number'  placeholder='Price' {...register('price', { required: true })}/>
                {errors.price && errors.price.type === 'required' && (<p><BiError/> This is Required</p>)}

                <textarea rows='3'  type='text'  placeholder='Description...' {...register('description', { required: true ,minLength:3})}/>
                {errors.description && errors.description.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.description && errors.description.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}

                <select onFocus={e=>e.target[0].disabled=true} {...register('category', { required: true })}>
                  <option value="">Select Category</option>
                  {mapCategory.map((item,index)=><option value={item.id} key={index}>{item.id}-{item.category}</option>)}
                </select>
                {errors.category && errors.category.type === 'required' && (<p><BiError/> This is Required</p>)}

                <div className='radio-box'>
                  <h3>Active</h3> 
                 <div className='radio-in'><input type="radio" required {...register('active', { required: true })} value="Yes"></input> Yes </div>
                 <div className='radio-in'><input type="radio" defaultChecked required {...register('active', { required: true })} value="No" /> No</div>
                </div>
                {errors.active && errors.active.type === 'required' && (<p><BiError/> This is Required</p>)}
               
                <input  type='file' placeholder='Image' onChange={e=>setValue('imageName', e.target.value.files)}   
                  {...register('imageName', { required: true,
                    validate: value =>
                    value[0].size/1024 < 500  || "Size must Be at the most 0.5 Mo"
                  })}
                />
                <p style={{color:"#36837E"}}>Image</p>
                {errors.imageName && errors.imageName.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.imageName && errors.imageName.type === 'validate' && (<p><BiError/> Size must Be at the most 0.5 Mo</p>)}
                
                <input  type='file' placeholder='Back Image' onChange={e=>setValue('backImageName', e.target.value.files)}  
                  {...register('backImageName', { required: true,
                    validate: value =>
                    value[0].size/1024 < 500  || "Size must Be at the most 0.5 Mo"
                  })}
                />
                <p style={{color:"#36837E"}}>Back Image</p>
                {errors.backImageName && errors.backImageName.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.backImageName && errors.backImageName.type === 'validate' && (<p><BiError/> Size must Be at the most 0.5 Mo</p>)}
                
                                
                <input  type='submit' value='Add' className='btn-add' 
                
                />
            </form>
            <Link to='/bijoux'><h2>Return to Store <AiOutlineArrowRight className='aroow-right'/></h2></Link>
          </section>
        </div>
      </section>
    </>
  )
}
 
export default AddBijoux;

