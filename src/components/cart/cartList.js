import { useCart } from "./cartContext";
import { Header } from "../header";
import { BACKEND_URL } from "../backendUrl";
import axios from "axios";
import "./cartStyles.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DataLoader } from "../DataLoader";

export const Cart = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();
  const [isQtyUpdated, setQtyUpdate] = useState(true);
  const totalReducer = () =>
    itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const CartUpdate = async ({ type, payLoad }) => {
    const _id = payLoad;
    const itemFound = itemsInCart.find((item) => item._id === _id);
    let updatedQuantity;
    if (type === "INCREMENT") {
      updatedQuantity = itemFound.quantity + 1;
    } else {
      updatedQuantity = itemFound.quantity - 1;
      return updatedQuantity === 0 && deleteCartItem(_id);
    }
    try {
      setQtyUpdate(false);
      const { data } = await axios.post(`${BACKEND_URL}cart/${_id}`, {
        _id: _id,
        quantity: updatedQuantity
      });
      payLoad = {
        _id: _id,
        quantity: updatedQuantity
      };
      // console.log("passing load is", payLoad);
      setQtyUpdate(true);
      if (data.success) {
        cartDispatch({ type: "UPDATE", payLoad: payLoad });
      }
    } catch (err) {
      console.error("Error Occured", err);
    }
    return (
      <>
        <DataLoader />
      </>
    );
  };

  const deleteCartItem = async (_id) => {
    try {
      const { data } = await axios.delete(`${BACKEND_URL}cart/${_id}`);
      // console.log(data);

      if (data.success) {
        cartDispatch({ type: "REMOVE", payLoad: _id });
        toast.dark("Removed from cart", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true
        });
      }
    } catch (err) {
      console.error("Error happened", err);
    }
  };

  return (
    <section className="cart-container">
      <div>
        <Header />
        <h1 class="heading center fs-h1">My Cart</h1>
        {console.log("items in cart", { itemsInCart })}
        <div className="aside cart-total center">
          {itemsInCart.length !== 0 && (
            <div className="bill">
              <div className="para total">
                <b>Total:</b> {""}
                {""}
                {totalReducer()}
              </div>
              <div className="para">
                <b>Delivery Charges: Free</b>
                {""}
                {""}
              </div>
              <div className="para">
                <b>Bill Amount:</b>
                {""}
                {""}
                {totalReducer()}
              </div>
              <button className="btn btn--primary btn--buy-now">
                Order Now
              </button>
            </div>
          )}
        </div>
        <div className="container__main">
          <div className="card-container">
            {itemsInCart.length === 0 ? (
              <p className="para--lead">Ah! Looks like your Cart is empty</p>
            ) : (
              itemsInCart.map(
                ({
                  _id,
                  quantity,
                  name,
                  imageUrl,
                  price,
                  inStock,
                  fastDelivery,
                  ratings,
                  offer
                }) => (
                  <div className="card card--display" Key={_id}>
                    <div className="card__thumbnail">
                      <img src={imageUrl} className="card__img" alt="cardImg" />
                    </div>
                    {/* <i className="fa fa-heart wish-icon" aria-hidden="true"></i> */}
                    <div className="card__desc">
                      <h1>
                        <strong>{name}</strong>
                      </h1>
                      <div className="star-count">
                        <p className="star-count__star">{ratings}</p>
                        <div class="rating">
                          <div className="rating__stars">
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                      <h2>
                        <strong> ₹ {price}</strong>
                      </h2>
                      <p className="card__details offer">{offer}</p>
                      <i
                        class="fa fa-plus"
                        aria-hidden="true"
                        onClick={() =>
                          CartUpdate({ type: "INCREMENT", payLoad: _id })
                        }
                      ></i>
                      <div className="card__quantity">
                        {isQtyUpdated ? (
                          quantity
                        ) : (
                          <i class="fa fa-spinner fa-pulse qtySpinner fa-fw"></i>
                        )}
                      </div>
                      <i
                        class="fa fa-minus"
                        aria-hidden="true"
                        onClick={() =>
                          CartUpdate({ type: "DECREMENT", payLoad: _id })
                        }
                      ></i>
                      <button
                        className="btn btn--primary  btn--trash"
                        onClick={
                          () => deleteCartItem(_id)
                          // cartDispatch({ type: "REMOVE", payLoad: _id })
                        }
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};
