import React from "react";
import {FaFacebook, FaInstagram, FaPinterest, FaReddit, FaTelegram, FaTwitter, FaVimeo, FaYoutube} from 'react-icons/fa'
import { NavLink } from "react-router-dom";

const Foot = () => {
    return ( 
      <section className='intro-foot'>
        <div className='foot-about'>
          <div className='about-row2'>
            <h2>Categories</h2>
            <div className="categories">
              <NavLink to='/store'><h3>Bracelets</h3></NavLink>
              <NavLink to='/store'><h3>Earrings</h3></NavLink>
              <NavLink to='/store'><h3>Necklaces & Pendants</h3></NavLink>
              <NavLink to='/store'><h3>Rings</h3></NavLink>
              <NavLink to='/store'><h3>Wedding</h3></NavLink>
            </div>
          </div>    
          <div className='khat'></div>  
          <div className='about-row1'>
            <h2>BUSINESS HOURS</h2>
            <div className='hours-days'>
              <div className='days'>
                <h3>Saturday</h3>
                <h3>Sunday</h3>
                <h3>Monday</h3>
                <h3>Tuesday</h3>
                <h3>Wednesday</h3>
                <h3>Thursday</h3>
                <h3>Friday</h3>
              </div>
              <div className='hours'>
                <h3>10:00 - 20:00</h3>
                <h3>10:00 - 20:00</h3>
                <h3>10:00 - 20:00</h3>
                <h3>10:00 - 20:00</h3>
                <h3>10:00 - 20:00</h3>
                <h3>10:00 - 20:00</h3>
                <h3>10:00 - 20:00</h3>
              </div>
            </div>
          </div>  
          <div className='khat'></div>  
          <div className='about-row3'>
            <h2>Resources</h2>
            <div className="Resources">
              <NavLink to='/map'><h3>Visit Us</h3></NavLink>
              <NavLink to='/contact'><h3>Contact Us</h3></NavLink>
              <NavLink to='/histoire'><h3>Our Story</h3></NavLink>
              <NavLink to='/store'><h3>Shopping</h3></NavLink>
              <NavLink to='/about'><h3>About Us</h3></NavLink>
              <NavLink to='/gallery'><h3>Gallery</h3></NavLink>
            </div>
          </div>    
        </div>
        <div className='foot-social'>
          <NavLink to='/'><FaFacebook className='to-social' /></NavLink>
          <NavLink to='/'><FaInstagram className='to-social'/></NavLink>
          <NavLink to='/'><FaYoutube className='to-social'/></NavLink>
          <NavLink to='/'><FaPinterest className='to-social'/></NavLink>
          <NavLink to='/'><FaVimeo className='to-social'/></NavLink>
          <NavLink to='/'><FaReddit className='to-social'/></NavLink>
          <NavLink to='/'><FaTelegram className='to-social'/></NavLink>
          <NavLink to='/'><FaTwitter className='to-social'/></NavLink>
        </div>
        <div className='foot-final'>
          All rights reserved. Designed By- <h5> LM </h5>
        </div>
      </section>
     );
}
 
export default Foot;