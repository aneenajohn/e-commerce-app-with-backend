import { useCart } from "./cart/cartContext";
import { Link, useLocation } from "react-router-dom";
import { useWishList } from "./WishList/wishContext";

export const Header = () => {
  const { itemsInCart } = useCart();
  const { wishList } = useWishList();
  const location = useLocation();
  console.log(location.state);
  return (
    <nav className="head">
      <Link to="/">
        <p className="para--lead">Lingokart</p>
      </Link>
      <ul className="nav__menu">
        <li className="nav__item">
          <Link to="/">
            <div className="nav__link">Shop Now</div>
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/cart" state={{ itemsInCart }}>
            <div className="nav__link">
              {itemsInCart.length === 0 ? (
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              ) : (
                <div class="icon-badge">
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                  <span class="icon-badge__cart">{itemsInCart.length}</span>
                </div>
              )}
            </div>
          </Link>
        </li>
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
      </ul>
    </nav>
  );
};
