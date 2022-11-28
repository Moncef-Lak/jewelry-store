import React from "react";
import { TiDocumentDelete } from "react-icons/ti";
import { MdUpdate } from "react-icons/md";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { SiOrigin } from "react-icons/si";
import { Link } from "react-router-dom";

const CategoryElem = ({
  id,
  name,
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
            "category-image/" +
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
      <td>{name}</td>
      <td>
        {active === "Yes" ? (
          <SiOrigin className="active-yes" />
        ) : (
          <MdDoNotDisturbAlt className="active-no" />
        )}
      </td>
      <td>
        <Link
          to="/categories"
          className="delete"
          onClick={() => {
            setItemID(id);
            setIsPageHidden(false);
            setItemImg(image_name);
          }}
        >
          <TiDocumentDelete className="delete-in" />
        </Link>
        <Link to={`/update-category/${id}`} className="update">
          <MdUpdate className="update-in" />
        </Link>
      </td>
    </tr>
  );
};

export default CategoryElem;
