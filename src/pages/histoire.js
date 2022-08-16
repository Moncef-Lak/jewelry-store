import React from "react";
import img1 from '../images/story6.jpg';
import img2 from '../images/about1.jpg';
import Foot from "../Components/foot";


const Histoire = () => {

  return(
    <>
      
      <section className='histoire-page'>
        <div className='histoire-content-top'>
          <h1>Story</h1>
          <h2>DNA</h2>
          <h4>
            A unique story, then written by the expert hands 
            of the artisans of Place Lak working with Mon.
          </h4>
          <p>
            At the beginning of Irene: the desire to tell stories and to stage them. 
            These stories of love, of a life, of a city, 
            of a jewelry house, Marie Genon, founder of Irène, transcribed them into 
            unique jewelry, in jewelry models.
            <br/><br/>
            By surrounding herself with artists and craftsmen, by marrying her vision 
            as a scenographer with their know-how as silversmiths, gem-setters and 
            jewelers, Marie Genon imagined Irène as a creation studio where expertise 
            and craftsmanship prevail. passion. These engines are necessary to imagine 
            Jewelry lines inspired by architectural themes and to respond to requests 
            for tailor-made creations.
          </p>
          <img src={img2} alt='img'/>
        </div>
        <div className='histoire-content-bottom'>
          <p>
            Originally Belgian, Marie Genon only works with diamonds from Antwerp, 
            certified by the Gemological Institute of America and meeting the criteria 
            of the Kimberley Process. 
            A commitment to sustainable, conscious and far-sighted jewelry. So that 
            pleasure and benevolence rhyme.
            <br/><br/>
            Irène is also, and above all, a demanding work process, inspired by the 
            career of its founder: a creative process presenting a life-size model of 
            the future jewel, down to the smallest detail. Modeling essential to anticipate 
            all stages of design, overcome potential technical difficulties and bring to light 
            each of the facets of the jewelry story told. 
            A unique story, then written by the expert hands of the artisans of Place Vendôme 
            working with Irène.
            <br/><br/>
            Irène is also a desire to offer a different jewelry, playing with the scale ratios, 
            detailed to the hundredth of a millimeter, told, staged and inspired by architecture, 
            Art Nouveau, 
            daring jewelry from the beginning of the 20th century: that of Suzanne Belperron, René Boivin, 
            Fulco di Verdura, René Lalique.
            <br/><br/>
            Irene is Paris and its monuments, it is Antwerp and its precious stones; Irene is Marie 
            Genon and her creative studio wishing to write a new story.
            <br/><br/>
          </p>
          <img src={img1} alt='img'/>
          <h4>Algeria</h4>
        </div>
      </section>
      <Foot/>
    </>
  )
}
 
export default Histoire;

