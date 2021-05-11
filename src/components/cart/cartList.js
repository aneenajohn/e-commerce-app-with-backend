import { useCart } from "./cartContext";
import { useWishList } from "../WishList/wishContext";
import { Header } from "../header";
import { BACKEND_URL } from "../backendUrl";
import axios from "axios";
import "./cartStyles.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DataLoader } from "../DataLoader";

export const Cart = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();
  const { dispatch: wishDispatch, wishList } = useWishList();
  const [isQtyUpdated, setQtyUpdate] = useState(true);
  const totalReducer = () =>
    itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const CartUpdate = async ({ type, payLoad }) => {
    const _id = payLoad;
    const itemFound = itemsInCart.find((item) => item._id === _id);
    let updatedQuantity;
    if (type === "INCREMENT") {
      updatedQuantity = itemFound.quantity + 1;
    } else if (type === "DECREMENT") {
      updatedQuantity = itemFound.quantity - 1;
      // return updatedQuantity === 0 && deleteCartItem(_id);
      if (updatedQuantity === 0) {
        return deleteCartItem(_id);
      }
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
      console.log("passing load is", payLoad);
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
      console.log("inside delete");
      const { data } = await axios.delete(`${BACKEND_URL}cart/${_id}`);
      console.log(data);
      cartDispatch({ type: "REMOVE", payLoad: _id });
      if (data.success) {
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

  const wishlistHandler = async (product) => {
    console.log("Incoming data", product);

    const itemFound = wishList.find((item) => item._id === product._id);
    console.log("wish search", itemFound);

    if (itemFound) {
      try {
        const { data } = await axios.delete(
          `${BACKEND_URL}wishlist/${product._id}`
        );
        if (data.success) {
          wishDispatch({ type: "REMOVE", payLoad: product._id });
          toast.dark("Item removed from wishlist", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true
          });
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const { data } = await axios.post(`${BACKEND_URL}wishlist`, {
          _id: product._id
        });
        // console.log("posted data", data);
        if (data.success) {
          wishDispatch({ type: "ADD_TO_WISHLIST", payLoad: product });
          toast.success("Item added to wish list", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true
          });
        }
      } catch (err) {
        console.error(err);
      }
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
                <b>Discount 20%:</b>
                {""}
                {""}
                {0.2 * totalReducer()}
              </div>
              <div className="para">
                <b>Amount to be paid:</b>
                {""}
                {""}
                {totalReducer() - 0.2 * totalReducer()}
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
              itemsInCart.map((data) => (
                <div className="card card--display" Key={data._id}>
                  <div className="card__thumbnail">
                    <img
                      src={data.imageUrl}
                      className="card__img"
                      alt="cardImg"
                    />
                  </div>
                  <i
                    className="fa fa-heart wish-icon"
                    aria-hidden="true"
                    onClick={() => wishlistHandler(data)}
                  ></i>
                  <div className="card__desc">
                    <h1>
                      <strong>{data.name}</strong>
                    </h1>
                    <div className="star-count">
                      <p className="star-count__star">{data.ratings}</p>
                      <div class="rating">
                        <div className="rating__stars">
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <h2>
                      <strong> ₹ {data.price}</strong>
                    </h2>
                    <p className="card__details">{data.offer}</p>
                    <i
                      class="fa fa-plus"
                      aria-hidden="true"
                      onClick={() =>
                        CartUpdate({ type: "INCREMENT", payLoad: data._id })
                      }
                    ></i>
                    <div className="card__quantity">
                      {isQtyUpdated ? (
                        data.quantity
                      ) : (
                        <i class="fa fa-spinner fa-pulse qtySpinner fa-fw"></i>
                      )}
                    </div>
                    <i
                      class="fa fa-minus"
                      aria-hidden="true"
                      onClick={() =>
                        CartUpdate({ type: "DECREMENT", payLoad: data._id })
                      }
                    ></i>
                    <button
                      className="btn btn--primary  btn--trash"
                      onClick={
                        () => deleteCartItem(data._id)
                        // cartDispatch({ type: "REMOVE", payLoad: _id })
                      }
                    >
                      <i class="fa fa-trash-o" aria-hidden="true"></i>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};
