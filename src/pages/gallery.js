import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Foot from "../Components/foot";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TweenMax, gsap, TimelineLite, Power3 } from "gsap";
import img1 from '../images/gallery1.jpg';
import img2 from '../images/gallery2.jpg';
import { useGlobalContext } from "../contexts/adminContext";
import MyPicture from "../Components/myPicture";
import { GiCutDiamond } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger);
let tl = new TimelineLite();


const Gallery = () => {
  const { galleryItems } = useGlobalContext();
  let faceText = useRef(null)
  let imgBox = useRef(null)
  // console.log(Math.ceil(Math.random() * 10));
  const [is, setIS] = useState(false)

  useEffect(() => {




    // -----------------------------------------------------------------------

    // let allPicture = [...imgBox.children]
    //   setTimeout(()=>{
    //     for (let i = 0; i < allPicture.length; i++) {
    //       if (i !== 0) {
    //         TweenMax.from([allPicture[i]], 1, {y: 300, opacity: 0,
    //           scrollTrigger: {
    //             trigger: allPicture[i],
    //             scrub: 1.2,
    //             start: '-200px bottom',           
    //             markers:true   
    //           }
    //         })
    //       }
    //     }
    //   },1000)

    // -----------------------------------------------------------------------

    TweenMax.to(faceText, 1, {
      y: -100,
      scrollTrigger: {
        trigger: faceText,
        scrub: 1,
        start: '-100px 20%',
        end: '300px',
      }
    })
    // -----------------------------------------------------------------------

    tl.from(".gallery-face .h1-animation-after", 1, { xPercent: -102 })
      .to(".gallery-face .h1-animation-after", 1, { xPercent: 102 })
      .to(".gallery-face .h1-animation-before", 1, { xPercent: 102 })
      .from(".gallery-face img", 1, { y: 600, opacity: 0 });

    TweenMax.from('.gallery-story .text', 1, {
      xPercent: 100, opacity: 0,
      scrollTrigger: {
        trigger: '.gallery-story',
        start: 'center bottom',
        toggleActions: 'restart null null reverse',

      }
    })

    TweenMax.from('.gallery-story img', 1.5, {
      xPercent: -100, opacity: 0, ease: Power3.easeOut,
      scrollTrigger: {
        trigger: '.gallery-story',
        start: 'center bottom',
        toggleActions: 'restart null null reverse',
      }
    })

    


  }, [])

  const change = () => {
    setIS(!is);
  }

  return (
    <>
      <section className='gallery-page'>
        <div className='gallery-face'>
          <h1 ref={e => faceText = e}>Premon Gallery <p className='h1-animation-before'></p> <p className='h1-animation-after'></p></h1>
          <img src={img1} alt='img' />
        </div>
        <div className='gallery-story'>
          <img src={img2} alt='img' />
          <div className="text">
            <p>
              Do you really listen when you are talking with someone? I have a friend who listens
              in an unforgiving way. She actually takes every word you say as being something
              have a friend that listens like that, words take on a whole new meaning.
              I'm heading back to Colorado tomorrow after being down in Santa Barbara over the weekend for
              the festival there. I will be making October plans once there and will
              schedule and my flight plans…".
            </p>
            <NavLink to='/about'>READ ON</NavLink>
          </div>
        </div>
        <div className='All-picture' ref={e => imgBox = e}>
          <div className='chnage-position'><GiCutDiamond onClick={change} className='diamond-logo' /></div>
          {galleryItems.map((item, index) => {
            // transform:`translateX(${Math.random()*50}%)`
            if (item.active === 'Yes') {
              return <MyPicture {...item} index={index} key={index} imgBox={imgBox} />
            }
            return null;
          })}
        </div>
      </section>
      <Foot />
    </>
  )
}

export default React.memo(Gallery);

