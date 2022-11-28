import React from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { SiOrigin } from "react-icons/si";
import { MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/adminContext";

const BijouxElem = ({
  id,
  name,
  description,
  category_id,
  image_name,
  price,
  active,
  image_name2,
  index,
  setItemID,
  setIsPageHidden,
  setItemImg,
  setItemImgBack,
}) => {
  const { categoryItems } = useGlobalContext();
  const category = categoryItems.filter(
    (category) => category.id === category_id
  );

  return (
    <tr className={`${index % 2 > 0 && "cd"}`}>
      <td>{index + 1}</td>
      <td className="img">
        <img
          src={
            process.env.REACT_APP_IMAGE_FILE_PATH + "bijoux-image/" + image_name
          }
          onError={(e) =>
            (e.target.src =
              process.env.REACT_APP_IMAGE_FILE_PATH + "008_-_404_error_4x.webp")
          }
          onClick={(e) => e.target.classList.toggle("zoomImg")}
          alt="img"
        />
      </td>
      <td className="img">
        <img
          src={
            process.env.REACT_APP_IMAGE_FILE_PATH +
            "bijoux-image/" +
            image_name2
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
      <td>{category[0] ? category[0].name : "Unknown"}</td>
      <td>
        {description.length > 20
          ? description.substring(0, 19) + "..."
          : description}
      </td>
      <td>
        {active === "Yes" ? (
          <SiOrigin className="active-yes" />
        ) : (
          <MdDoNotDisturbAlt className="active-no" />
        )}
      </td>
      <td>{price}$</td>
      <td>
        <Link
          to="/bijoux"
          className="delete"
          onClick={() => {
            setItemID(id);
            setIsPageHidden(false);
            setItemImg(image_name);
            setItemImgBack(image_name2);
          }}
        >
          <IoIosRemoveCircle className="delete-in" />
        </Link>
        <Link to={`/update-bijoux/${id}`} className="update">
          <MdUpdate className="update-in" />
        </Link>
      </td>
    </tr>
  );
};

export default BijouxElem;
