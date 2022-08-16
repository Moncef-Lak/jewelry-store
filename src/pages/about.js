import React from "react";
import { NavLink } from "react-router-dom";
import Foot from "../Components/foot";
import logo from '../images/lm-logo.png';
import img1 from '../images/about2.jpg';

const About = () => {

  return(
    <>
      
      <section className='about-page'>
        <div className='one-latter'>
          <h1>A</h1>
          <h4>About</h4>
        </div>
        <div className='beginnings'>
          <h1>Pure beginnings.</h1>
          <div className='in-img'>
            {/* All of MONLAK's pieces are crafted by artisan Mohammed
            in the Setif .  */}
            <p>
              Since 2014 we have been creating pieces.
              At MONLAK, we don’t just sell jewelry. 
              We’re on a mission to bring a little bit of magic to mindful 
              and strong women around the world. We believe that ​high 
              quality jewelry shouldn’t just be for a limited group of 
              people​, and strive to offer fair pricing while keeping ethical sourcing in mind.
              By selling online, we avoid traditional markups and pass 
              those savings directly to you…
            </p>
          </div>
        </div>
        <div className='about-us'>
          <div className='top-fitt'>
            <h1>OUR VISION</h1>
            <p>
              At MONLAK, we don’t just sell jewelry. We’re on a mission to bring a little bit of magic
              to mindful and strong women around the world. We believe that ​high quality jewelry shouldn’t
              just be for a limited group of people​, and strive to offer fair pricing while keeping ethical 
              sourcing in mind. By selling online only,
              we avoid traditional markups and pass those savings directly to you…
              She tried not to judge him. His ratty clothes and unkempt hair made him look 
              homeless. Was he really the next Einstein as she had been told? 
              On the off chance it was true, she continued to try not to judge him.
              I recollect that my first exploit in squirrel-shooting was in a grove of tall walnut-trees 
              that shades one side
              of the valley. I had wandered into it at noontime, when all nature is peculiarly quiet, and was 
              startled by the roar of my own gun, as it broke the Sabbath stillness around and was prolonged 
              and reverberated by the angry echoes.
              She reached her goal, exhausted. Even more chilling to her was that the euphoria that she thought 
              she'd feel upon reaching it wasn't there. Something wasn't right. Was this the only feeling she'd 
              have for over five years of hard work?
              <br/><br/>
              It seemed like it should have been so simple. There was nothing inherently difficult with 
              getting the project done. It was simple and straightforward enough that even a child should 
              have been able to complete it on time, 
              but that wasn't the case. The deadline had arrived and the project remained unfinished.
              The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted 
              it up and dropped it to the table. Still nothing. She banged her closed fist against the top. 
              It was at this moment she saw the irony of trying to 
              fix the machine with violence.
              Things aren't going well at all with mom today. She is just a limp noodle and wants to 
              sleep all the time. I sure hope that things get better soon.
              You know that tingly feeling you get on the back of your neck sometimes? I just got that 
              feeling when talking with her. You know I don't believe in sixth senses, but there is something 
              ot right with her. I don't know how I know, but I 
              just do.
              "What is the best way to get what you want?" she asked. He looked down at the ground 
              knowing that she wouldn't like his answer. He hesitated, knowing that the truth would only hurt.
               How was he going to tell her that the best way for him to get 
              what he wanted was to leave her?
              They argue. While the argument seems to be different the truth is it's always the 
              same. Yes, the topic may be different or the circumstances, but when all said and done, 
              it all came back to the same thing. They both knew it, but neither has the 
              courage or strength to address the underlying issue. So they continue to argue.
            </p>
          </div>
          <div className='bottom-fitt'>
            <img src={img1} className='old-img' alt='img'/>
            <h4>
              All of MONLAK's pieces are crafted by artisan Riad
              in the Timimoun
            </h4>
            <NavLink to='/'><img src={logo} className='logo' alt='img'/></NavLink>
          </div>
        </div>
      </section>
      <Foot/>
    </>
  )
}
 
export default About;

