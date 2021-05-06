import { useCart } from "./cartContext";
import { Header } from "../header";
export const Cart = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();

  const totalReducer = () =>
    itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <section className="cart-container">
      <div>
        <Header />
        <h1 class="heading center fs-h1">My Cart</h1>
        {console.log("items in cart", { itemsInCart })}
        <div className="cart-total center">
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
              itemsInCart.map(
                ({
                  id,
                  quantity,
                  name,
                  image,
                  price,
                  inStock,
                  fastDelivery,
                  ratings,
                  offer
                }) => (
                  <div className="card card--display" Key={id}>
                    <div className="card__thumbnail">
                      <img src={image} className="card__img" alt="cardImg" />
                    </div>
                    <i className="fa fa-heart wish-icon" aria-hidden="true"></i>
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
                        <strong>{price}</strong>
                      </h2>
                      <p className="card__details">{offer}</p>
                      <i
                        class="fa fa-plus"
                        aria-hidden="true"
                        onClick={() =>
                          cartDispatch({ type: "INCREMENT", payLoad: id })
                        }
                      ></i>
                      <div className="card__quantity">{quantity}</div>
                      <i
                        class="fa fa-minus"
                        aria-hidden="true"
                        onClick={() =>
                          cartDispatch({ type: "DECREMENT", payLoad: id })
                        }
                      ></i>
                      <button
                        className="btn btn--primary  btn--trash"
                        onClick={() =>
                          cartDispatch({ type: "REMOVE", payLoad: id })
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
        </div>
      </div>
    </section>
  );
};
