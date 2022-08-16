import React, { useEffect, useRef, useState } from "react";
import img1 from '../images/boutiqeFace.jpg';
import img2 from '../images/boutique2.jpg';
import ScrollTrigger from "gsap/ScrollTrigger";
import { TweenMax, gsap, TimelineLite, Power3 } from "gsap";
import Products from "../Components/produccts";
import Foot from "../Components/foot";
import { FaDelicious } from 'react-icons/fa';
import { VscSplitVertical } from 'react-icons/vsc';
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";
import SelectCategory from "../Components/category-choise";

let tl = new TimelineLite();

gsap.registerPlugin(ScrollTrigger);
const Boutique = () => {
  const { bijouxItems, categoryItems } = useGlobalContext();
  const [isChanging, setIsChanging] = useState(false)
  const [items, setItems] = useState([])

  let faceText = useRef(null)
  let changeDisplay = useRef(null);

  useEffect(() => {
    setItems(bijouxItems);
  }, [bijouxItems])

  useEffect(() => {

    TweenMax.to(faceText, 1, {
      y: -65,
      scrollTrigger: {
        trigger: faceText,
        scrub: 1,
        start: '-100px 20%',
        end: '300px',
      }
    })

    TweenMax.from(changeDisplay, 1, {
      y: 300, opacity: 0,
      scrollTrigger: {
        trigger: changeDisplay.parentElement,
        start: 'top bottom',
        toggleActions: 'restart null null reverse',
      }
    })

    tl.from(".boutique-face .h1-animation-after", 1, { xPercent: -102 })
      .to(".boutique-face .h1-animation-after", 1, { xPercent: 102 })
      .to(".boutique-face .h1-animation-before", 1, { xPercent: 102 })
      .from(".boutique-face img", 1, { y: 600, opacity: 0 });


    TweenMax.from('.boutique-story .text', 1, {
      xPercent: 100, opacity: 0,
      scrollTrigger: {
        trigger: '.boutique-story',
        start: 'center bottom',
        toggleActions: 'restart null null reverse',

      }
    })

    TweenMax.from('.boutique-story img', 1.5, {
      xPercent: -100, opacity: 0, ease: Power3.easeOut,
      scrollTrigger: {
        trigger: '.boutique-story',
        start: 'center bottom',
        toggleActions: 'restart null null reverse',

      }
    })

  }, [])
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [])

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000)
  }, [isChanging])
  // useEffect(()=>{
  //   const all_products_Elements=[...all_products.children]
  //   setTimeout(()=>{
  //     for (let i = 0; i < all_products_Elements.length-1; i++) {
  //       TweenMax.from(all_products_Elements[i],.5,{opacity:0,
  //       scrollTrigger:{
  //         trigger:all_products_Elements[i],
  //         start:'top bottom',    
  //       }
  //     })

  //     }
  //   },500)
  // },[isChanging])

  return (
    <>

      <section className='in-boutique'>
        <div className='boutique-face'>
          <h1 ref={e => faceText = e}>Premon Elixirs  <p className='h1-animation-before'></p> <p className='h1-animation-after'></p></h1>
          <img src={img1} alt="img" />
        </div>
        <div className='boutique-story'>
          <img src={img2} alt="img" />
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
        <div className={`all-product ${isChanging && 'all-product-change'}`} >
          <SelectCategory categoryItems={categoryItems} setItems={setItems} bijouxItems={bijouxItems} />

          {items.length ? items.map((item, index) => {
            if (item.active === 'Yes') {
              return <Products {...item} key={index} index={index} isChanging={isChanging} />
            }
            return null;
          }) : <h1 className='noItems'>Nothing For Know</h1>}

          <div className="change-display" ref={e => changeDisplay = e}>
            <div className={`to-row ${isChanging && 'to-true'}`} onClick={() => setIsChanging(true)}><FaDelicious /></div>
            <div className={`to-row ${!isChanging && 'to-true'}`} onClick={() => setIsChanging(false)}><VscSplitVertical /></div>
          </div>
        </div>
      </section>
      <Foot />
    </>

  )



}

export default Boutique;

