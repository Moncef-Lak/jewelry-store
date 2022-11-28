import React, { useCallback, useEffect, useState } from "react";
import Foot from "../Components/foot";
import { Link, useHistory, useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";
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
            {state.image_name2 && (
              <img
                src={
                  process.env.REACT_APP_IMAGE_FILE_PATH +
                  "bijoux-image/" +
                  state.image_name2
                }
                onError={(e) =>
                  (e.target.src =
                    process.env.REACT_APP_IMAGE_FILE_PATH +
                    "008_-_404_error_4x.webp")
                }
                alt="img"
              />
            )}
          </div>
          <div className="details-side">
            <h1>{state.name}</h1>
            <h3>€{state.price}</h3>
            <p>{state.description}</p>
            <button
              onClick={() =>
                addItem(state.name, state.price, state.image_name, id)
              }
            >
              Add to cart
            </button>
          </div>
          <div className="img-center">
            {state.image_name && (
              <img
                src={
                  process.env.REACT_APP_IMAGE_FILE_PATH +
                  "bijoux-image/" +
                  state.image_name
                }
                onError={(e) =>
                  (e.target.src =
                    process.env.REACT_APP_IMAGE_FILE_PATH +
                    "008_-_404_error_4x.webp")
                }
                alt="img"
              />
            )}
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
                {state2.image_name2 && (
                  <img
                    src={
                      process.env.REACT_APP_IMAGE_FILE_PATH +
                      "bijoux-image/" +
                      state2.image_name2
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
                {state2.image_name && (
                  <img
                    src={
                      process.env.REACT_APP_IMAGE_FILE_PATH +
                      "bijoux-image/" +
                      state2.image_name
                    }
                    onError={(e) =>
                      (e.target.src =
                        process.env.REACT_APP_IMAGE_FILE_PATH +
                        "008_-_404_error_4x.webp")
                    }
                    className="img2"
                    alt="img"
                  />
                )}
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
