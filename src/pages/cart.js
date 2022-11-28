import React, { useState } from "react";
import logo from "./../images/logo3.png";
import logo2 from "./../images/logo (2).png";
import logo3 from "./../images/logo (3).png";
import logo4 from "./../images/logo (4).png";
import { useGlobalContext } from "../contexts/adminContext";
import { Link, NavLink } from "react-router-dom";
const Cart = () => {
  const { cartItems, total, setCartItems } = useGlobalContext();
  const [change, setChange] = useState(false);
  const removeItem = (id) => {
    let item = cartItems.find((item) => item.id === id);
    if (item) {
      if (item.current === 1) {
        setCartItems(cartItems.filter((item) => item.id !== id));
      } else {
        item.current -= 1;
        setCartItems([...cartItems]);
      }
    }
  };
  return (
    <section className="cart-page">
      <section className="pay-fill">
        <NavLink to="/">
          <div className="title">Monlak</div>
        </NavLink>
        <fieldset className="payment-box">
          <legend>Express checkout</legend>
          <div className="box box1">
            <img src={logo} alt="img" />
          </div>
          <div className="box box2">
            <img src={logo2} alt="img" />
          </div>
          <div className="box box3">
            <img src={logo3} alt="img" />
          </div>
        </fieldset>
        <h4>OR</h4>
        <fieldset className="payment-box">
          <legend>Algeria checkout payment</legend>
          <div className="box box4">
            <img src={logo4} alt="img" />
          </div>
        </fieldset>
        <div className="contact-info">
          <div className="title">Contact information</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="input"
              placeholder="Email or mobile phone number"
            />
            <input type="submit" value="Continue to shipping" className="btn" />
          </form>
        </div>
      </section>

      <section className="items-fill">
        <div className="all-products">
          {cartItems.map((item, index) => {
            const { price, name, img, current, id } = item;
            return (
              <div key={index} className="product-box">
                <Link to={`/detail/${id}`}>
                  <div className="img">
                    <div className="current">{current}</div>
                    <img
                      src={
                        process.env.REACT_APP_IMAGE_FILE_PATH +
                        "bijoux-image/" +
                        img
                      }
                      onError={(e) =>
                        (e.target.src =
                          process.env.REACT_APP_IMAGE_FILE_PATH +
                          "008_-_404_error_4x.webp")
                      }
                      alt="img"
                    />
                  </div>
                </Link>
                <h3>{name}</h3>
                <h4>${price * current + ".00"}</h4>
                <h5 onClick={() => removeItem(id)}>DELETE</h5>
              </div>
            );
          })}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={(e) =>
              e.target.value.length > 0 ? setChange(true) : setChange(false)
            }
            className="input"
            placeholder="Gift card or discount code"
          />
          <input
            type="submit"
            value="Apply"
            className={`btn ${change && "btn-change"}`}
          />
        </form>

        <div className="ttl-box">
          <h3>Total</h3>
          <h4>${total > 0 ? total + ".00" : 0}</h4>
        </div>
      </section>
    </section>
  );
};

export default Cart;
