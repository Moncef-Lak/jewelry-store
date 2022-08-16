import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const [failed, setFailed] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const myobj = { username: data.username, password: data.password };
    const url = process.env.REACT_APP_API_PASSWORD+'login.php';
    try {
      axios.post(url, myobj).then(data => {
        if (data.data === 'faild') {
          setFailed(true);
        }
        else {
          localStorage.setItem('UserData', { name: data.data });
          setRedirect(true);
        }
      })
    } catch (error) {
      console.log(error)
      console.log('faild');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('UserData')) {
      setRedirect(true);
    }
  }, [])

  useEffect(() => {
    const stop=setTimeout(() => {
      setFailed(false);
    }, 5000)

    return () => clearTimeout(stop);
  }, [failed])


  if (redirect) {
    return (<Redirect to='/home' />)
  }


  return (
    <section className='login-page'>
      <form onSubmit={handleSubmit(onSubmit)} >
        {failed && <p>You have entered an invalid email or password</p>}
        <input type='text' placeholder='User Name' {...register('username', { required: true, minLength: 3 })} />
        {errors.username && errors.username.type === 'required' && (<p><BiError /> This is Required</p>)}
        {errors.username && errors.username.type === 'minLength' && (<p><BiError /> Min Length Should Be 3</p>)}
        <input type='password' placeholder='Password' {...register('password', { required: true, minLength: 5, maxLength: 15 })} />
        {errors.password && errors.password.type === 'required' && (<p><BiError /> You must specify a password </p>)}
        {errors.password && errors.password.type === 'minLength' && (<p><BiError /> Password must have at least 5 characters </p>)}
        {errors.password && errors.password.type === 'maxLength' && (<p><BiError /> Password must have at the most 15 characters </p>)}

        <input type='submit' value='Login' className='btn-add' />

      </form>
    </section>
  )
}

export default Login;

