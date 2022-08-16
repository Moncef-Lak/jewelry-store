import React, { useEffect,  useState } from "react";
import AdminNavbar from "./Components/navbar";
import img2 from '../images/undraw_chore_list_re_2lq8.svg';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {BiError} from 'react-icons/bi';
import { Link,   useHistory } from "react-router-dom";
import axios from "axios";
import { MdDoNotDisturbOn } from "react-icons/md";
import { useForm ,} from "react-hook-form";


const AddCategory = () => {
  const {push}=useHistory();

  const [msgShowing,setMsgShowing]=useState(false);
  const [msg,setMsg]=useState(null);
    
  const {register,handleSubmit, setValue,formState: { errors }}=useForm();


  const handleSubmit2=(data)=>{

    const myObj=new FormData();
    // const myObj={name:data.name,active:data.active,image_name,type:'add-category'}
    
    myObj.append('image',data.imageName[0],data.imageName[0].name);
    myObj.append('active',data.active);
    myObj.append('name',data.name);  
    myObj.append('type','add-category');  

    try {
      axios.post(process.env.REACT_APP_API_PASSWORD+'add.php',myObj)
      .then(data=>{
        if (data.data==='ok') {
          push('./categories')
        }
        if (data.data==='faild') {
          setMsgShowing(true);      
          setMsg('Fail To Add Category');      
        }
        if (data.data==='faild to upload image') {
          setMsgShowing(true);      
          setMsg('faild to upload image');      
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
            <img src={img2} alt='img' style={{width:"80%"}}/>
          </section>
          <section className='right-side'>
            <form onSubmit={handleSubmit(handleSubmit2)} >
                <input  
                  type='text' 
                  required
                  placeholder='name' 
                  {...register('name', { required: ' This is Required' ,minLength:3} )}
                />
                {/* <ErrorMessage errors={errors} name='name' as={<p> <BiError/> This is Required</p>} /> */}
                {errors.name && errors.name.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.name && errors.name.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}
                
                <div className='radio-box'>
                  <h3>Active</h3> 
                 <div className='radio-in'><input type="radio" required {...register('active', { required: true })} value="Yes"></input> Yes </div>
                 <div className='radio-in'><input type="radio" required {...register('active', { required: true })} value="No" /> No</div>
                </div>
                {errors.active && errors.active.type === 'required' && (<p><BiError/> This is Required</p>)}
               
                <input  type='file' onChange={e=>setValue('imageName', e.target.value.files)}  placeholder='image' 
                  {...register('imageName', { required: true,
                    validate: value =>
                    value[0].size/1024 < 500  || "Size must Be at the most 0.5 Mo"
                  })}
                
                />
                {errors.imageName && errors.imageName.type === 'required' && (<p><BiError/> This is Required</p>)}
                {errors.imageName && errors.imageName.type === 'validate' && (<p><BiError/> Size must Be at the most 0.5 Mo</p>)}
                
                                
                <input  type='submit' value='Add' className='btn-add' 
                
                />
            </form>
            <Link to='/categories'><h2>Return to Categories <AiOutlineArrowRight className='aroow-right'/></h2></Link>
          </section>
        </div>
      </section>
    </>
  )
}
 
export default AddCategory;

