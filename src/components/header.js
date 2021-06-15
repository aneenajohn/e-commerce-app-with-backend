import { useCart } from "./cart/cartContext";
import { Link, useLocation } from "react-router-dom";
import { useWishList } from "./WishList/wishContext";
import "./header.css";
import { useAuth } from "./Context/authProvider";
import { ADD_TO_CART, SET_LOGOUT, ADD_TO_WISHLIST } from "./utils/constants";

export const Header = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();
  const { wishList, dispatch: wishDispatch } = useWishList();
  const location = useLocation();
  console.log(location.state);
  // console.log("wishlist in header", wishList);

  const {
    authState: { isLoggedIn, userToken },
    authDispatch
  } = useAuth();
  // const {isLoggedIn,userToken} = authState;
  console.log("isLoggedIn: ", isLoggedIn, "userToken: ", userToken);

  function logouthandler() {
    localStorage?.removeItem("login");
    authDispatch({
      type: SET_LOGOUT
    });
    cartDispatch({
      type: ADD_TO_CART,
      payLoad: []
    });
    wishDispatch({ type: ADD_TO_WISHLIST, payLoad: [] });
  }

  return (
    <nav className="head">
      <Link to="/">
        <p className="para--lead app-home">Lingokart</p>
      </Link>
      <ul className="menu">
        {/* <li className="nav__item">
          <Link to="/">
            <div className="nav__link">Shop Now</div>
          </Link>
        </li> */}

        {/* <li className="nav__item"> */}
        <Link to="/cart" state={{ itemsInCart }}>
          <div className="nav__link">
            {itemsInCart.length === 0 ? (
              <i
                className="fa fa-shopping-cart fa-shopping-cart--nav"
                aria-hidden="true"
              ></i>
            ) : (
              <div class="icon-badge">
                <i class="fa fa-shopping-cart cart" aria-hidden="true"></i>
                <span class="icon-badge__cart">{itemsInCart.length}</span>
              </div>
            )}
          </div>
        </Link>
        {/* </li> */}
        <li className="nav__item">
          <Link to="/wishlist" state={{ wishList }}>
            <div className="nav__link">
              {wishList.length === 0 ? (
                <i className="fa fa-heart wish-header" aria-hidden="true"></i>
              ) : (
                <div class="icon-badge">
                  <i class="fa fa-heart wish-header" aria-hidden="true"></i>
                  <span class="icon-badge__wish">{wishList.length}</span>
                </div>
              )}
            </div>
          </Link>
        </li>

        <li className="nav__item">
          {isLoggedIn ? (
            <p className="para logout-text" onClick={() => logouthandler}>
              Logout
            </p>
          ) : (
            <Link to="/login">
              <div className="nav__link login-text"> Login</div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
