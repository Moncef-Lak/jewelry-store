import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from './../images/lm-logo.png';
import { FaSearch, FaShopify } from 'react-icons/fa';
import { ImMenu3, ImMenu4 } from 'react-icons/im';
import { NavLink, useLocation } from "react-router-dom";
import { TweenMax, gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SearshForm from "../Components/searchForm";
import { useGlobalContext } from "../contexts/adminContext";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serachHeight, setSerachHeight] = useState(0);
  const { pathname } = useLocation();

  let navbar = useRef(null);
  const { amount } = useGlobalContext()

  // show and hide navbar function
  const show_hidden_navbar = () => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      if (window.pageXOffset < 100) {
        if (navbar?.parentElement) {
          navbar.parentElement.style.top = "0";
        }
      }

      let currentScrollPos = window.pageYOffset;
      if (currentScrollPos >= 400) {
        if (prevScrollpos > currentScrollPos) {
          // console.log('prevScrollpos => ' + prevScrollpos);
          // if (navbar) {
          if (navbar?.parentElement) {
            navbar.parentElement.style.top = "0";
          }
          // }
        } else {
          if (navbar?.parentElement) {
            navbar.parentElement.style.top = "-100px";
          }
        }
        prevScrollpos = currentScrollPos;
      }
    }
  }
  const openSeach = useCallback(() => {
    if (isSearch) {
      if (navbar) {
        navbar.children[1].style.height = serachHeight + 'px';
        navbar.style.backgroundColor = '#fff';
      }
    }
    else {
      if (navbar) {
        navbar.children[1].style.height = '0px';
        if (window.pageYOffset < 100) {
          navbar.style.backgroundColor = 'transparent';
        }

      }
    }
  }, [serachHeight, isSearch])

  const openMenu = useCallback(() => {
    if (isMenuOpen) {
      if (navbar) {
        navbar.children[2].style.height = '400px';
        navbar.style.backgroundColor = '#fff';
      }
    }
    else {
      if (navbar) {
        navbar.children[2].style.height = '0px';
        if (window.pageYOffset < 100) {
          navbar.style.backgroundColor = 'transparent';
        }

      }
    }
  }, [isMenuOpen])


  useEffect(() => {
    openSeach();
  }, [isSearch, serachHeight, openSeach])

  useEffect(() => {
    openMenu();
  }, [isMenuOpen, openMenu])



  useEffect(() => {

    TweenMax.to(navbar, .5, {
      margin: '10px 0', backgroundColor: "#fff", border: '.5px solid #ddd',
      scrollTrigger: {
        trigger: navbar.parentElement.parentElement,
        start: '200px 100px',
        toggleActions: 'restart null null reverse',

      }
    })
    // ----------------------------------------------------------------

    setIsSearch(false);
    setIsMenuOpen(false);

    // ----------------------------------------------------------------

    show_hidden_navbar();

    // ----------------------------------------------------------------

    setTimeout(() => {
      window.scrollTo(0, 0);

    }, 100);


  }, [pathname])




  return (
    <div className='navbar'>
      <div className={`forSearch ${(isSearch || isMenuOpen) && 'isSearch'}`} onClick={() => {
        isSearch && setIsSearch(false);
        isMenuOpen && setIsMenuOpen(false);
      }}></div>
      <div className='navbar-in-out' ref={e => navbar = e}>
        <div className='navbar-in'>
          <div className='in-left'>
            <div className={`li`}><NavLink to='/store'>Store</NavLink></div>
            <div className={`li`}><NavLink to='/galler'>gallery</NavLink></div>
            <div className={`li`}><NavLink to='/histoire'>Story </NavLink></div>
          </div>
          <NavLink to='/' className='in-center'>
            <img src={logo} alt='logo' />
          </NavLink>
          <div className='in-right'>
            <div className={`li`}><NavLink to='/about'>About</NavLink></div>
            <div className={`li`}><NavLink to='/contact'>contact</NavLink></div>
            <div className={`li ${isMenuOpen && 'pointer-events'}`} onClick={() => setIsSearch(!isSearch)}><FaSearch /></div>
            <div className={`li Shopify`}><NavLink to='/cart'><div className='current'>{amount}</div><FaShopify /></NavLink></div>
          </div>
        </div>
        <div className='navbar-out'>
          <SearshForm setSerachHeight={setSerachHeight} setIsSearch={setIsSearch} />
        </div>
        <div className='media-navbar'>
          <div className={`li`}><NavLink to='/store'>Store</NavLink></div>
          <div className={`li`}><NavLink to='/galler'>gallery</NavLink></div>
          <div className={`li`}><NavLink to='/histoire'>Story </NavLink></div>
          <div className={`li`}><NavLink to='/about'>About</NavLink></div>
          <div className={`li`}><NavLink to='/contact'>contact</NavLink></div>
          <div className={`li Shopify`}><NavLink to='/cart'><div className='current'>{amount}</div><FaShopify /></NavLink></div>
        </div>
        <div className={`Search-icon ${isMenuOpen && 'pointer-events'}`} onClick={() => setIsSearch(!isSearch)}>
          <h2><FaSearch /></h2>
        </div>
        <div className={`humberger ${isSearch && 'pointer-events'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <h2>{isMenuOpen ? <ImMenu4 /> : <ImMenu3 />}</h2>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

