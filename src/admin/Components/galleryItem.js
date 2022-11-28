import React from "react";
import { TiDocumentDelete } from "react-icons/ti";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { SiOrigin } from "react-icons/si";
import { MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const GalleyElem = ({
  id,
  favorit,
  image_name,
  active,
  index,
  setItemID,
  setIsPageHidden,
  setItemImg,
}) => {
  return (
    <tr className={`${index % 2 > 0 && "cd"}`}>
      <td>{index + 1}</td>
      <td className="img">
        <img
          src={
            process.env.REACT_APP_IMAGE_FILE_PATH +
            "gallery-image/" +
            image_name
          }
          onError={(e) =>
            (e.target.src =
              process.env.REACT_APP_IMAGE_FILE_PATH + "008_-_404_error_4x.webp")
          }
          onClick={(e) => e.target.classList.toggle("zoomImg")}
          alt="img"
        />
      </td>
      <td>
        {active === "Yes" ? (
          <SiOrigin className="active-yes" />
        ) : (
          <MdDoNotDisturbAlt className="active-no" />
        )}
      </td>
      <td>
        {favorit === "Yes" ? (
          <FaHeart className="active-yes love-logo" />
        ) : (
          <FaHeartBroken className="active-no love-logo" />
        )}
      </td>
      <td>
        <Link
          to="/gallery"
          className="delete"
          onClick={() => {
            setItemID(id);
            setIsPageHidden(false);
            setItemImg(image_name);
          }}
        >
          <TiDocumentDelete className="delete-in" />
        </Link>
        <Link to={`/update-picture/${id}`} className="update">
          <MdUpdate className="update-in" />
        </Link>
      </td>
    </tr>
  );
};

export default GalleyElem;
