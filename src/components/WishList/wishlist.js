import { useWishList } from "./wishContext";
import { Header } from "../header";
import { useState } from "react";
import "./wishList-styles.css";
import { BACKEND_URL } from "../backendUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const WishList = () => {
  const { wishList, dispatch: wishDispatch } = useWishList();

  const deleteFromWishlist = async (productId) => {
    try {
      const { data } = await axios.delete(
        `${BACKEND_URL}wishlist/${productId}`
      );
      if (data.success) {
        wishDispatch({ type: "REMOVE", payLoad: productId });
        toast.dark("Item removed from wishlist", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="wish-container">
      <div>
        <Header />
        <h1 class="heading center fs-h1">My WishList</h1>
        <div className="container__main">
          <div className="card-container">
            {wishList.length === 0 ? (
              <p className="para--lead">Ahh..Looks like wishlist is empty </p>
            ) : (
              wishList.map(
                ({
                  _id,
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
                      <button
                        className="btn btn--primary  btn--trash"
                        onClick={() =>
                          // wishDispatch({ type: "REMOVE", payLoad: _id })
                          deleteFromWishlist(_id)
                        }
                      >
                        <i
                          class="fa fa-trash-o"
                          aria-hidden="true"
                          // onClick={() => deleteFromWishlist()}
                        ></i>
                        Remove
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
