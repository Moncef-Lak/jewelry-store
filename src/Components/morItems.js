import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tilty from "react-tilty";
import errorImage from "./../images/008_-_404_error_4x.webp";

const MoreItem = ({ id, image_name, image_name2, shiffre, fourBijoux }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [backImgUrl, setBackImgUrl] = useState(null);

  useEffect(() => {
    try {
      if (require("../../public/php/images/bijoux-image/" + image_name)) {
        setImgUrl(
          require("../../public/php/images/bijoux-image/" + image_name).default
        );
      }
    } catch (error) {
      setImgUrl(errorImage);
    }
    try {
      if (require("../../public/php/images/bijoux-image/" + image_name2)) {
        setBackImgUrl(
          require("../../public/php/images/bijoux-image/" + image_name2).default
        );
      }
    } catch (error) {
      setBackImgUrl(errorImage);
    }
  }, [shiffre, fourBijoux, image_name, image_name2, imgUrl]);
  return (
    <Tilty className="img-box-0" scale={1.075} speed={1000}>
      <Link to={`/detail/${id}`} className="img-box">
        <img src={backImgUrl} className="img1" alt="img" />
        <img
          src={imgUrl}
          className="img2"
          style={{ transform: "translateZ(70px)" }}
          alt="img"
        />
      </Link>
    </Tilty>
  );
};

export default React.memo(MoreItem);
