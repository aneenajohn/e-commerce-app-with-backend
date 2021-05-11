import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../backendUrl";
import { useCart } from "../cart/cartContext";
import { Header } from "../header";
import { useWishList } from "../WishList/wishContext";
import { useProduct } from "./productContext";
import { getFilteredData } from "../Filter/filter";
import { getSortedData } from "../Filter/sort";
import { ToastContainer, toast } from "react-toastify";
import { DataLoader } from "../DataLoader";
import "react-toastify/dist/ReactToastify.css";

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
  // const [isSelected, setSelected] = useState(false);
  const [isLoading, setLoader] = useState(false);

  // const toggle = () => setSelected(!isSelected);

  useEffect(() => {
    (async function () {
      try {
        setLoader(true);
        const {
          data: { products: dataFromServer }
        } = await axios.get(`${BACKEND_URL}products`);
        // console.log(dataFromServer);

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
  // https://lingokart-api.aneenasam.repl.co/cart
  const addToCartHandler = async (product) => {
    const itemFound = itemsInCart.find((item) => item._id === product._id);
    // console.log("wish search", itemFound);

    if (itemFound) {
      toast.dark("Item already present in cart", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true
      });
    } else {
      try {
        const { data } = await axios.post(`${BACKEND_URL}cart`, {
          _id: product._id,
          quantity: 1
        });
        // console.log("posted data", data);
        // console.log("id is", data.product);

        if (data.success) {
          cartDispatch({ type: "ADD_TO_CART", payLoad: product });
          toast.success("Added to cart", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    return (
      <>
        <DataLoader />
      </>
    );
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
                    className="fa fa-heart wish-icon"
                    aria-hidden="true"
                    onClick={() => wishlistHandler(data)}
                    // onClick={() => <WishlistHandler data={data} />}
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
                      className="btn btn--primary btn--cart"
                      // onClick={() => {
                      //   cartDispatch({ type: "ADD_TO_CART", payLoad: data._id });
                      // }}
                      onClick={() => addToCartHandler(data)}
                    >
                      Add to cart {"   "}
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                    {}

                    {}
                  </div>
                  <ToastContainer />
                </div>
              );
            })
          ) : (
            <div>
              <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
