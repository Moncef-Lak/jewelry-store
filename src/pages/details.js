import React, { useCallback, useEffect, useState } from "react";
import Foot from "../Components/foot";
import { Link, useHistory, useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";
import errorImage from "./../images/008_-_404_error_4x.webp";
import MoreItem from "../Components/morItems";
import axios from "axios";

const Detail = React.memo(() => {
  const [state, setState] = useState({
    name: "",
    description: "",
    image_name: "",
    price: null,
    image_name2: "",
  });
  const [state2, setState2] = useState({
    name: "",
    image_name: "",
    image_name2: "",
    id: "",
  });

  const { id } = useParams();
  const { push } = useHistory();
  const [fourBijoux, setFourBijoux] = useState([]);
  const [sameCatagory, setSameCatagory] = useState({});
  const [imgUrl, setImgUrl] = useState(null);
  const [backImgUrl, setBackImgUrl] = useState(null);
  const [frimgUrl, setFrImgUrl] = useState(null);
  const [frbackImgUrl, setFrBackImgUrl] = useState(null);
  const { bijouxItems, setCartItems, cartItems } = useGlobalContext();
  const bijouxItem = bijouxItems.filter((item) => item.id === id);

  const getMoreBijoux = useCallback(() => {
    const myObj = new FormData();
    myObj.append("id", bijouxItem[0]?.id);
    myObj.append("category_id", bijouxItem[0]?.category_id);
    try {
      axios
        .post(
          process.env.REACT_APP_API_PASSWORD + "getMoreBijouxItem.php",
          myObj
        )
        .then((data) => {
          if (data.data !== "Error") {
            setFourBijoux(data.data.moreItems);
            setSameCatagory(data.data.sameCategoryProduct);
            const { name, description, image_name, price, image_name2, id } =
              data.data.sameCategoryProduct;
            setState2({
              name,
              description,
              price,
              image_name,
              image_name2,
              id,
            });
            try {
              if (
                require("../../public/php/images/bijoux-image/" + image_name)
              ) {
                setFrImgUrl(
                  require("../../public/php/images/bijoux-image/" + image_name)
                    .default
                );
              }
            } catch (error) {
              setFrImgUrl(errorImage);
            }
            try {
              if (
                require("../../public/php/images/bijoux-image/" + image_name2)
              ) {
                setFrBackImgUrl(
                  require("../../public/php/images/bijoux-image/" + image_name2)
                    .default
                );
              }
            } catch (error) {
              setFrBackImgUrl(errorImage);
            }
            if (bijouxItem[0]) {
              const { name, description, image_name, price, image_name2 } =
                bijouxItem[0];
              setState({
                ...state,
                name,
                description,
                price,
                image_name,
                image_name2,
              });
            }

            try {
              if (
                require("../../public/php/images/bijoux-image/" +
                  bijouxItem[0].image_name)
              ) {
                setImgUrl(
                  require("../../public/php/images/bijoux-image/" +
                    bijouxItem[0].image_name).default
                );
              }
            } catch (error) {
              setImgUrl(errorImage);
            }
            try {
              if (
                require("../../public/php/images/bijoux-image/" +
                  bijouxItem[0].image_name2)
              ) {
                setBackImgUrl(
                  require("../../public/php/images/bijoux-image/" +
                    bijouxItem[0].image_name2).default
                );
              }
            } catch (error) {
              setBackImgUrl(errorImage);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [bijouxItem, state]);

  useEffect(() => {
    getMoreBijoux();
  }, [id]);

  useEffect(() => {
    if (bijouxItems.length < 1) {
      push("../store");
    }
  }, [push, bijouxItems.length]);

  const addItem = (name, price, img, id, current = 1) => {
    let item = cartItems.find((item) => item.id === id);
    if (item && item.current >= 10) {
      return null;
    }
    if (item && item.current < 10) {
      item.current += 1;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { name, price, img, id, current }]);
    }
  };
  return (
    <>
      <section className="details-page">
        <div className="in-deails">
          <div className="img-side">
            <img src={backImgUrl} alt="img" />
          </div>
          <div className="details-side">
            <h1>{state.name}</h1>
            <h3>€{state.price}</h3>
            <p>{state.description}</p>
            <button
              onClick={() => addItem(state.name, state.price, imgUrl, id)}
            >
              Add to cart
            </button>
          </div>
          <div className="img-center">
            <img src={imgUrl} alt="img" />
          </div>
        </div>
        {sameCatagory && (
          <div className="more-product-1">
            <div className="left-fitt">
              <h2>See also</h2>
              <h1>{state2.name}</h1>
              <Link to={`/detail/${state2.id}`}>
                <button>BUY ONLINE</button>
              </Link>
            </div>
            <div className="right-fitt">
              <div className="img-box">
                <img src={frbackImgUrl} className="img1" alt="img" />
                <img src={frimgUrl} className="img2" alt="img" />
              </div>
            </div>
          </div>
        )}
        <div className="more-product-2">
          <h1> More</h1>
          {fourBijoux.map((item, index) => {
            return (
              <MoreItem
                {...item}
                key={index}
                shiffre={id}
                fourBijoux={fourBijoux}
              />
            );
          })}
        </div>
      </section>
      <Foot />
    </>
  );
});

export default Detail;
