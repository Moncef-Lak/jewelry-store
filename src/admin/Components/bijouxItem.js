import React, { useEffect, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { SiOrigin } from "react-icons/si";
import { MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/adminContext";
import errorImage from "./../../images/008_-_404_error_4x.webp";

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
  const [imgUrl, setImgUrl] = useState(null);
  const [backImgUrl, setBackImgUrl] = useState(null);
  const category = categoryItems.filter(
    (category) => category.id === category_id
  );

  // chek file exists
  useEffect(() => {
    try {
      if (require("../../../public/php/images/bijoux-image/" + image_name)) {
        setImgUrl(
          require("../../../public/php/images/bijoux-image/" + image_name)
            .default
        );
      }
    } catch (error) {
      setImgUrl(errorImage);
    }

    try {
      if (require("../../../public/php/images/bijoux-image/" + image_name2)) {
        setBackImgUrl(
          require("../../../public/php/images/bijoux-image/" + image_name2)
            .default
        );
      }
    } catch (error) {
      setBackImgUrl(errorImage);
    }
  }, [image_name, image_name2, setImgUrl]);

  return (
    <tr className={`${index % 2 > 0 && "cd"}`}>
      <td>{index + 1}</td>
      <td className="img">
        <img
          onClick={(e) => e.target.classList.toggle("zoomImg")}
          src={imgUrl}
          alt="img"
        />
      </td>
      <td className="img">
        <img
          onClick={(e) => e.target.classList.toggle("zoomImg")}
          src={backImgUrl}
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
