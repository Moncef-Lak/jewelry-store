import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useCallback, useRef, useEffect, useState } from "react";
import errorImage from './../images/not-found-image.jpg';

gsap.registerPlugin(ScrollTrigger);

const MyPicture = ({ image_name, index }) => {
    const [imgUrl, setImgUrl] = useState(null);
    let picture = useRef(null);
    
    useEffect(()=>{
        setTimeout(()=>{
            ScrollTrigger.refresh();
        },1000)
    },[])
    const imgAnimation = useCallback(() => {
        gsap.from(picture, 1, {
            y: 300, opacity: 0,scale:.5,skewX:'10deg',
            scrollTrigger: {
                trigger: picture,
                scrub: 1.2,
                start:'top bottom',
                end:'-200px center',
                          
            }
        })
    }, [])

    useEffect(() => {
        try {
            if (require('../images/gallery-image/' + image_name)) {
                setImgUrl(require('../images/gallery-image/' + image_name).default)
            }
        } catch (error) {
            setImgUrl(errorImage)
        }
        imgAnimation();
        
    }, [image_name, imgAnimation])


    return (
        <div ref={e => picture = e} className={`img-anim img-box-left  ${index % 2 > 0 ? false : 'img-box-right'}`} >
            <img src={imgUrl} alt='img' style={index % 2 > 0 ? { left: Math.random() * 40 + '%' } : { left: -Math.random() * 40 + '%' }} />
        </div>
    );
}

export default React.memo(MyPicture);