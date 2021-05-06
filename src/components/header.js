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
            <div className="nav__link">Home</div>
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/cart" state={{ itemsInCart }}>
            <div className="nav__link">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
            </div>
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/wish-list" state={{ wishList }}>
            <div className="nav__link">
              <i className="fa fa-heart wish-header" aria-hidden="true"></i>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
