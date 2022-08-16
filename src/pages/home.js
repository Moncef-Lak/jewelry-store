import gsap, { TweenMax, TimelineLite, Power3 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import into_image1 from './../images/homeBijoux8.jpg';
import into_image3 from './../images/homeBijoux3.jpg';
import into_image4 from './../images/homeBijoux4.jpg';
import into_image5 from './../images/homeBijoux5.jpg';
import Foot from "../Components/foot";


gsap.registerPlugin(ScrollTrigger);
let tl = new TimelineLite();
let tl2 = new TimelineLite();
const Home = () => {

  let photo_container = useRef(null);
  let fill = useRef(null);
  let mini_about = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500)
  }, [])

  useEffect(() => {
    let currentPixel = window.pageYOffset;
    const looper = () => {
      const newPixel = window.pageYOffset;
      const diff = newPixel - currentPixel
      const speed = diff * 1.3;

      if (photo_container) {
        photo_container.style.transform = "skewY(" + speed + "deg)"
        currentPixel = newPixel;
        requestAnimationFrame(looper)
      }
    }

    let fillElements = [...fill.children]
    let allPhotos = [...photo_container.children]

    TweenMax.to(fillElements[0], 1, {
      xPercent: -100, ease: 'none',
      scrollTrigger: {
        trigger: fill.parentElement.parentElement,
        scrub: 1,
        start: 'top top',
        end: '+=730px',
      }
    })
    TweenMax.to(fillElements[1], 1, {
      xPercent: 100, ease: 'none',
      scrollTrigger: {
        trigger: fill.parentElement.parentElement,
        scrub: 1,
        start: 'top top',
        end: '+=730px',
      },
    })
    TweenMax.to(fillElements[2], 1, {
      yPercent: 62, ease: 'none',
      scrollTrigger: {
        trigger: fill.parentElement.parentElement,
        scrub: 1,
        start: 'top top',
        end: '+=730px',
      },
    })
    TweenMax.to(fillElements[3], 1, {
      yPercent: -100, ease: 'none',
      scrollTrigger: {
        trigger: fill.parentElement.parentElement,
        scrub: 1,
        start: 'top top',
        end: '+=730px',
      }
    })
    TweenMax.to(fill, 1, {
      backgroundSize: '110%', ease: 'none',
      scrollTrigger: {
        trigger: fill.parentElement.parentElement,
        scrub: 0,
        start: 'top top',
        end: '+=730px',
      }
    })

    // ------------------------------------------------------------------------

    for (let i = 0; i < allPhotos.length - 1; i++) {
      TweenMax.from([allPhotos[i]], 1, {
        y: 300, opacity: 0,
        scrollTrigger: {
          trigger: allPhotos[i],
          scrub: 1,
          start: '-150% bottom',
        }
      })
    }
    TweenMax.from(allPhotos[4], 1, {
      y: 300, ease: Power3.easeOut, opacity: 0,
      scrollTrigger: {
        trigger: allPhotos[4],
        start: 'top bottom',
      }
    })

    // ------------------------------------------------------------------------

    TweenMax.staggerFrom(['.text-intro h1 p'], 1, {
      y: 100, opacity: 0,
      scrollTrigger: {
        trigger: '.text-intro h1',
        start: '10% bottom',
        end: '-100px 30%',
        scrub: 1.5,
      }
    }, .5)

    // ------------------------------------------------------------------------

    TweenMax.staggerFrom([mini_about.children[0], mini_about.children[1], mini_about.children[2]], 1, {
      y: 100, opacity: 0,
      scrollTrigger: {
        trigger: mini_about,
        start: 'top bottom',
        end: 'center 50%',
        scrub: 1.5,
      }
    }, 1)

    // if (fill_after) {
    //   TweenMax.from(fill_after,1,{x:300,opacity:0,zIndex:10,background:"red"})
    // }    

    // ------------------------------------------------------------------------

    looper();

    // ------------------------------------------------------------------------


  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
    tl.from(".h1-animation-after", 1, { xPercent: -102 })
      .to(".h1-animation-after", 1, { xPercent: 102 })
      .to(".h1-animation-before", 1, { xPercent: 102 });
    tl2.from(".h3-animation-after", 1, { xPercent: -102 })
      .to(".h3-animation-after", 1, { xPercent: 102 })
      .to(".h3-animation-before", 1, { xPercent: 102 })
      .to(".fill-page", 1, { y: 0, opacity: 1 });

  }, [])

  return (
    <>

      <section className='the-fill'>
        <div className='fill-content'>
          <h1>Monlak<p className='h1-animation-before'></p> <p className='h1-animation-after'></p></h1>
          <h3>Algeria<p className='h3-animation-before'></p> <p className='h3-animation-after'></p></h3>
        </div>
        <div className='fill-page' ref={e => fill = e}>
          <div className='left-fill'></div>
          <div className='right-fill'></div>
          <div className='top-fill'></div>
          <div className='bottom-fill'></div>
        </div>
      </section>
      <div className='space-animation'></div>
      <section className='content'>
        <div className='text-intro' >
          <h1>
            <p>The world of perfume, precious and hypnotic, has always drawn us.</p>
            <p>Maybe because perfume, like jewelry, touches the skin? This first</p>
            <p>collection, an homage to perfume, could also just be: a</p><p>declaration.</p>
          </h1>
        </div>
        <div className='intro-photos' ref={e => photo_container = e}>
          <div className='intor-img img1'><img src={into_image1} alt='img' /></div>
          <div className='intor-img img4'><img src={into_image5} alt='img' /></div>
          <div className='intor-img img3'><img src={into_image4} alt='img' /></div>
          <div className='intor-img img2'><img src={into_image3} alt='img' /></div>

          <div className='to-shop-page'>
            <h4>COLLECTION</h4>
            <h1>Precious Elixirs </h1>
            <NavLink to="/store"><button>DISCOVER</button></NavLink>
          </div>
        </div>
      </section>
      <section className='to-about' ref={e => mini_about = e}>
        <h4>About</h4>
        <h1>
          Mon and Lak are brothers. Twins too.
          Of Algeria origin, they grew up in Sahra (Sud)
          by the sounds and images of Hadba.
        </h1>
        <NavLink to="/about"><button>READ ON</button></NavLink>
      </section>
      <Foot />
    </>
  );
}

export default Home;

