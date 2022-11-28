import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useCallback, useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const MyPicture = ({ image_name, index }) => {
  let picture = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2000);
  }, []);
  const imgAnimation = useCallback(() => {
    gsap.from(picture, 1, {
      y: 300,
      opacity: 0,
      scale: 0.5,
      skewX: "10deg",
      scrollTrigger: {
        trigger: picture,
        scrub: 1.2,
        start: "top bottom",
        end: "-200px center",
      },
    });
  }, []);

  useEffect(() => {
    imgAnimation();
  }, [imgAnimation]);

  return (
    <div
      ref={(e) => (picture = e)}
      className={`img-anim img-box-left  ${
        index % 2 > 0 ? false : "img-box-right"
      }`}
    >
      <img
        src={
          process.env.REACT_APP_IMAGE_FILE_PATH + "gallery-image/" + image_name
        }
        onError={(e) =>
          (e.target.src =
            process.env.REACT_APP_IMAGE_FILE_PATH + "008_-_404_error_4x.webp")
        }
        alt="img"
        style={
          index % 2 > 0
            ? { left: Math.random() * 40 + "%" }
            : { left: -Math.random() * 40 + "%" }
        }
      />
    </div>
  );
};

export default React.memo(MyPicture);
