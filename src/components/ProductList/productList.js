import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../cart/cartContext";
import { Header } from "../header";
import { useWishList } from "../WishList/wishContext";
import { useProduct } from "./productContext";
import { getFilteredData } from "../Filter/filter";
import { getSortedData } from "../Filter/sort";

export default function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishDispatch } = useWishList();
  const { sortBy, showInventoryAll, showFastDeliveryOnly } = useProduct();
  const { dispatch: productDispatch } = useProduct();
  const [isSelected, setSelected] = useState(false);
  const toggle = () => setSelected(!isSelected);
  useEffect(() => {
    (async function () {
      try {
        const {
          data: { products: dataFromServer }
        } = await axios.get("/api/products");
        console.log(dataFromServer);
        setProductsData(dataFromServer);
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
          class="btn btn--primary filter"
          onClick={() => productDispatch({ type: "CLEAR_FILTER" })}
        >
          Clear Filter
        </div>
      </div>
      <div className="container__main">
        <div className="card-container">
          {filteredData ? (
            filteredData.map((data) => {
              return (
                <div className="card card--display" key={data.id}>
                  <div className="card__thumbnail">
                    <img src={data.image} className="card__img" alt="cardImg" />
                  </div>
                  <i
                    className="fa fa-heart wish-icon"
                    // className={
                    //   isSelected
                    //     ? "fa fa-heart wish-icon wish-icon--selected"
                    //     : "fa fa-heart wish-icon"
                    // }
                    aria-hidden="true"
                    onClick={() => {
                      wishDispatch({ type: "ADD_TO_WISHLIST", payLoad: data });
                      toggle();
                    }}
                  ></i>
                  <div className="card__desc">
                    <h1>
                      <strong>{data.name}</strong>
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
                      <strong>{data.price}</strong>
                    </h2>
                    <p className="card__details offer">{data.offer}</p>
                    <button
                      className="btn btn--primary btn--cart"
                      onClick={() => {
                        cartDispatch({ type: "ADD_TO_CART", payLoad: data });
                      }}
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
            <div>Loading....</div>
          )}
        </div>
      </div>
    </section>
  );
}
