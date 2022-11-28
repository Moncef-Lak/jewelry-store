import React from "react";
import { Link } from "react-router-dom";
import Tilty from "react-tilty";

const MoreItem = ({ id, image_name, image_name2 }) => {
  return (
    <Tilty className="img-box-0" scale={1.075} speed={1000}>
      <Link to={`/detail/${id}`} className="img-box">
        {image_name2 && (
          <img
            src={
              process.env.REACT_APP_IMAGE_FILE_PATH +
              "bijoux-image/" +
              image_name2
            }
            onError={(e) =>
              (e.target.src =
                process.env.REACT_APP_IMAGE_FILE_PATH +
                "008_-_404_error_4x.webp")
            }
            className="img1"
            alt="img"
          />
        )}
        {image_name && (
          <img
            src={
              process.env.REACT_APP_IMAGE_FILE_PATH +
              "bijoux-image/" +
              image_name
            }
            onError={(e) =>
              (e.target.src =
                process.env.REACT_APP_IMAGE_FILE_PATH +
                "008_-_404_error_4x.webp")
            }
            className="img2"
            style={{ transform: "translateZ(70px)" }}
            alt="img"
          />
        )}
      </Link>
    </Tilty>
  );
};

export default React.memo(MoreItem);
