import { useWishList } from "./wishContext";
import { Header } from "../header";
import "./wishList-styles.css";
import { ToastContainer } from "react-toastify";
import { deleteFromWishlist } from "../ServerCalls/ServerCalls";
import { EmptyWishlist } from "./EmptyWishlist";
export const WishList = () => {
  const { wishList, dispatch: wishDispatch } = useWishList();

  return (
    <section className="wish-container">
      <div>
        <Header />
        {wishList.length === 0 ? (
          <p className="para--lead">
            <EmptyWishlist />
          </p>
        ) : (
          <div className="container__main">
            <h1 class="heading center fs-h1">My WishList</h1>
            <div className="card-container">
              {wishList.map(
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
                  <div>
                    <div className="card card--display" Key={_id}>
                      <div className="card__thumbnail">
                        <img
                          src={imageUrl}
                          className="card__img"
                          alt="cardImg"
                        />
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
                            deleteFromWishlist(_id, name, wishDispatch)
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
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer style={{ fontSize: "medium" }} />
    </section>
  );
};