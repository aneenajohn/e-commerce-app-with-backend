// import { useCart } from "./cart/cartContext";
// import { Link, useLocation } from "react-router-dom";
// import { useWishList } from "./WishList/wishContext";

// export const Header = () => {
//   const { itemsInCart } = useCart();
//   const { wishList } = useWishList();
//   const location = useLocation();
//   console.log(location.state);
//   // console.log("wishlist in header", wishList);
//   return (
//     <nav className="head">
//       <Link to="/">
//         <p className="para--lead">Lingokart</p>
//       </Link>
//       <ul className="nav__menu">
//         <li className="nav__item">
//           <Link to="/">
//             <div className="nav__link">Shop Now</div>
//           </Link>
//         </li>
//         <li className="nav__item">
//           <Link to="/cart" state={{ itemsInCart }}>
//             <div className="nav__link">
//               {itemsInCart.length === 0 ? (
//                 <i
//                   className="fa fa-shopping-cart fa-shopping-cart--nav"
//                   aria-hidden="true"
//                 ></i>
//               ) : (
//                 <div class="icon-badge">
//                   <i class="fa fa-shopping-cart" aria-hidden="true"></i>
//                   <span class="icon-badge__cart">{itemsInCart.length}</span>
//                 </div>
//               )}
//             </div>
//           </Link>
//         </li>
//         <li className="nav__item">
//           <Link to="/wishlist" state={{ wishList }}>
//             <div className="nav__link">
//               {wishList.length === 0 ? (
//                 <i className="fa fa-heart wish-header" aria-hidden="true"></i>
//               ) : (
//                 <div class="icon-badge">
//                   <i class="fa fa-heart wish-header" aria-hidden="true"></i>
//                   <span class="icon-badge__wish">{wishList.length}</span>
//                 </div>
//               )}
//             </div>
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// Second header
// import { useCart } from "./cart/cartContext";
// import { Link, useLocation } from "react-router-dom";
// import { useWishList } from "./WishList/wishContext";
// import { useState } from "react";
// import "./header.css";

// export const Header = () => {
//   const { itemsInCart } = useCart();
//   const { wishList } = useWishList();
//   const location = useLocation();
//   console.log(location.state);

//   const [isSelected, setSelected] = useState(false);
//   const toggleActive = () => setSelected(!isSelected);
//   // console.log("wishlist in header", wishList);
//   return (
//     <div className="container">
//       <header className="header">
//         <nav className="navbar">
//           <Link to="/" className="nav__logo">
//             <p className="para--lead">Lingokart</p>
//           </Link>
//           <ul className={isSelected ? "nav__menu active" : "nav__menu"}>
//             <li className="nav__item">
//               <Link to="/">
//                 <div className="nav__link">Shop Now</div>
//               </Link>
//             </li>
//             <li className="nav__item">
//               <Link to="/cart" state={{ itemsInCart }}>
//                 <div className="nav__link">
//                   {itemsInCart.length === 0 ? (
//                     <i
//                       className="fa fa-shopping-cart fa-shopping-cart--nav"
//                       aria-hidden="true"
//                     ></i>
//                   ) : (
//                     <div class="icon-badge">
//                       <i class="fa fa-shopping-cart" aria-hidden="true"></i>
//                       <span class="icon-badge__cart">{itemsInCart.length}</span>
//                     </div>
//                   )}
//                 </div>
//               </Link>
//             </li>
//             <li className="nav__item">
//               <Link to="/wishlist" state={{ wishList }}>
//                 <div className="nav__link">
//                   {wishList.length === 0 ? (
//                     <i
//                       className="fa fa-heart wish-header"
//                       aria-hidden="true"
//                     ></i>
//                   ) : (
//                     <div class="icon-badge">
//                       <i class="fa fa-heart wish-header" aria-hidden="true"></i>
//                       <span class="icon-badge__wish">{wishList.length}</span>
//                     </div>
//                   )}
//                 </div>
//               </Link>
//             </li>
//           </ul>
//           <div
//             className={isSelected ? "hamburger active" : "hamburger"}
//             onClick={() => toggleActive()}
//           >
//             <span className="bar"></span>
//             <span className="bar"></span>
//             <span className="bar"></span>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };
