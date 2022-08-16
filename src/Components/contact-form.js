import axios from "axios";
import React from "react";
import { useForm ,} from "react-hook-form";
import { BiError } from "react-icons/bi";
import { useHistory } from "react-router-dom";


const ContactForm = ({setMsgCheck,setShowMsg}) => {
  const {push}=useHistory();
  const {register,handleSubmit,formState: { errors }}=useForm();
  const onSubmit=(data)=>{
    const myObj={name:data.name,subject:data.subject,email:data.email,number:data.number,message:data.message,type:'add-contact'};
    const url=process.env.REACT_APP_API_PASSWORD+'add.php';
    try {
      axios.post(url,myObj).then(message=>{
        setShowMsg(true);
        if (message.data==='ok') {
          setMsgCheck(true);
          setTimeout(()=>{
            push('/');
          },4000)
        }
        else{
          setMsgCheck(false);
        }
      });
    } catch (error) {
      setMsgCheck(false);
      console.log(error);
    }

  }
  return(
    <>
          <form className='left-side-contact' onSubmit={handleSubmit(onSubmit)}>
              <input name='subject' placeholder='Subject' type='text' {...register('subject', { required: true ,minLength:3})}/>
              {errors.subject && errors.subject.type === 'required' && (<p><BiError/> This is Required</p>)}
              {errors.subject && errors.subject.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}
              
              <input name='name' placeholder='Name' type='text' {...register('name', { required: true ,minLength:3})}/>
              {errors.name && errors.name.type === 'required' && (<p><BiError/> This is Required</p>)}
              {errors.name && errors.name.type === 'minLength' && (<p><BiError/> Min Length Should Be 3</p>)}
              
              <input name='email' placeholder='Email' type='email' {...register('email', { required: true })}/>
              {errors.email && errors.email.type === 'required' && (<p><BiError/> This is Required</p>)}
              
              <input name='number' placeholder='Number' type='number' {...register('number', { required: true,minLength:9,maxLength:12 })}/>
              {errors.number && errors.number.type === 'required' && (<p><BiError/> This is Required</p>)}
              {errors.number && errors.number.type === 'minLength' && (<p><BiError/> Min Length Should Be 9</p>)}
              {errors.number && errors.number.type === 'maxLength' && (<p><BiError/> Number must have at the most 12 </p>)}

              <textarea name='message' placeholder='Message' type='text' rows='10'  {...register('message', { required: true ,maxLength:300,minLength:5})}/>
              {errors.message && errors.message.type === 'required' && (<p><BiError/> This is Required</p>)}
              {errors.message && errors.message.type === 'maxLength' && (<p><BiError/> Message must have at the most 300 characters</p>)}
              {errors.message && errors.message.type === 'minLength' && (<p><BiError/> Min Length Should Be 5</p>)}
              
              <input type='submit' value='Submit' className='btn-submit-form'/>
          </form>
    </>
  )
}
 
export default ContactForm;

