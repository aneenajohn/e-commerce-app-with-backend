import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../backendUrl";
import { useCart } from "../cart/cartContext";
import { Header } from "../header";
import { useWishList } from "../WishList/wishContext";
import { useProduct } from "./productContext";
import { getFilteredData } from "../Filter/filter";
import { getSortedData } from "../Filter/sort";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCartHandler } from "../ServerCalls/ServerCalls";
import { wishlistHandler } from "../ServerCalls/ServerCalls";
import { getTrimmedTitle, isAddedInList } from "../utils/utils";

export default function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const { dispatch: cartDispatch, itemsInCart } = useCart();
  const { dispatch: wishDispatch, wishList } = useWishList();
  const {
    dispatch: productDispatch,
    sortBy,
    showInventoryAll,
    showFastDeliveryOnly
  } = useProduct();
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoader(true);
        const {
          data: { products: dataFromServer }
        } = await axios.get(`${BACKEND_URL}products`);
        setProductsData(dataFromServer);
        setLoader(false);
      } catch (err) {
        console.error(`Error happened ${err}`);
      }
    })();
  }, []);

  const sortedData = getSortedData(productsData, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    showInventoryAll,
    showFastDeliveryOnly
  );

  return (
    <section className="container">
      <div className="container__head">
        <Header />
      </div>
      <div className="container__aside">
        <fieldset>
          <legend class="para">Sort By</legend>
          <label class="para para--label">
            <input
              type="radio"
              name="sort"
              onChange={() =>
                productDispatch({ type: "SORT", payLoad: "PRICE_HIGH_TO_LOW" })
              }
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            ></input>
            Price - High to low
          </label>
          <br />
          <label class="para para--label">
            <input
              type="radio"
              name="sort"
              onChange={() =>
                productDispatch({ type: "SORT", payLoad: "PRICE_LOW_TO_HIGH" })
              }
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            ></input>
            Price - Low to high
          </label>
        </fieldset>
        <fieldset>
          <legend class="para">Availability</legend>
          <label class="para para--label">
            <input
              type="checkbox"
              checked={showInventoryAll}
              onChange={() => productDispatch({ type: "TOGGLE_INVENTORY" })}
            ></input>
            Include out of stock
          </label>
          <br />
          <label class="para para--label">
            <input
              type="checkbox"
              checked={showFastDeliveryOnly}
              onChange={() => productDispatch({ type: "TOGGLE_DELIVERY" })}
            ></input>
            Only fast Delivery
          </label>
        </fieldset>
        <div
          class="btn btn--primary filter-label"
          onClick={() => productDispatch({ type: "CLEAR_FILTER" })}
        >
          Clear Filter
        </div>
      </div>
      <div className="container__main">
        <div className="card-container">
          {!isLoading ? (
            filteredData.map((data) => {
              return (
                <div className="card card--display" key={data._id}>
                  <div className="card__thumbnail">
                    <img
                      src={data.imageUrl}
                      className="card__img"
                      alt="cardImg"
                    />
                  </div>
                  <i
                    className={
                      isAddedInList(data._id, wishList)
                        ? "fa fa-heart wish-icon wish-icon--selected"
                        : "fa fa-heart wish-icon"
                    }
                    aria-hidden="true"
                    onClick={() =>
                      wishlistHandler(data, wishList, wishDispatch)
                    }
                  ></i>
                  <div className="card__desc">
                    <h1>
                      <strong>{getTrimmedTitle(data.name)}</strong>
                    </h1>
                    <div className="star-count">
                      <p className="star-count__star">{data.ratings}</p>
                      <div className="rating">
                        <div className="rating__stars">
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <h2>
                      <strong> ₹ {data.price}</strong>
                    </h2>
                    <p
                      className={
                        data.inStock
                          ? "stock-details inStock"
                          : "stock-details outOfStock"
                      }
                    >
                      {data.inStock ? "In Stock" : "Out of stock"}
                    </p>
                    <p className="card__details offer">{data.offer}</p>
                    <button
                      className={
                        data.inStock
                          ? "btn btn--primary btn--cart"
                          : "btn btn--primary btn--cart disabled"
                      }
                      onClick={() =>
                        addToCartHandler(data, itemsInCart, cartDispatch)
                      }
                    >
                      Add to cart {"   "}
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                    {}

                    {}
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
            </div>
          )}
        </div>
        <ToastContainer style={{ fontSize: "medium" }} />
      </div>
    </section>
  );
}
