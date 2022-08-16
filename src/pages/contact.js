import React, { useEffect, useRef, useState } from "react";
import img1 from '../images/contact-image.jpg';
import Foot from "../Components/foot";
import ContactForm from "../Components/contact-form";
import { TweenMax } from "gsap";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdDoNotDisturbOn } from "react-icons/md";


const Contact = () => {
  const [showMsg,setShowMsg]=useState(false);
  const [msgCheck,setMsgCheck]=useState(false);
  let word=useRef(null);
  useEffect(()=>{
    const  letters=[...word.children];
    TweenMax.from(letters[0],1,{y:300,x:600,opacity:.2});
    TweenMax.from(letters[1],1,{y:-250,x:-300,opacity:.2});
    TweenMax.from(letters[2],1,{y:-200,x:400,opacity:.2});
    TweenMax.from(letters[3],1,{y:300,x:-700,opacity:.2});
    TweenMax.from(letters[4],1,{y:400,x:300,opacity:.2});
    TweenMax.from(letters[5],1,{y:-250,x:-700,opacity:.2});
    TweenMax.from(letters[6],1,{x:-800,opacity:.2});
  },[])
  let color=msgCheck ? '#009177' : '#C45259';
  useEffect(()=>{
    const hiddenMsg=setTimeout(() => {
      setShowMsg(false);
    }, 3000);
    return ()=>clearTimeout(hiddenMsg);
  },[showMsg]) 
  return(
    <>
      
      <section className='contact-page'>
        <div className={`msg-background ${showMsg && 'display-msg-background'}`}>
          <div className={`msg-box`}>
            <h1 style={{color:color}}>{!msgCheck ? <MdDoNotDisturbOn/> : <IoShieldCheckmarkSharp/>}</h1>
            <h2 style={{color:color}}>{!msgCheck ? 'Failed To Send Message Refresh the page Please' : 'Send Message Successfully Thank You'}</h2>
          </div>
        </div>
        <div className='intro-contact'>
          <h1 ref={e=>word=e}>
            <div>C</div>
            <div>O</div>
            <div>N</div>
            <div>T</div>
            <div>A</div>
            <div>C</div>
            <div>T</div>
          </h1>
        </div>
        <div className='body-contact'>
          <ContactForm setShowMsg={setShowMsg} setMsgCheck={setMsgCheck}/>
          <div className='right-side-contact'>
            <p>
              We answer all enquiries with joy and alacrity — you 
              can contact us directly from Saturday to Thursday, 9.30am
              to 6.30pm. Just send us an email at:Moncef@Lak.dz
            </p>
            <img src={img1} alt='img'/>
            <h4>Gue de Constantine City 75008 Alger</h4>
          </div>
        </div>
      </section>
      <Foot/>
    </>
  )
}
 
export default Contact;

