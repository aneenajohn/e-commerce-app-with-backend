import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./backendUrl";
import { useCart } from "./cart/cartContext";
import { useWishList } from "./WishList/wishContext";
import { useAuth } from "./Context/authProvider";

export const DataLoader = () => {
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishDispatch } = useWishList();
  const {
    authState: { isLoggedIn, userToken }
  } = useAuth();
  useEffect(() => {
    isLoggedIn &&
      (async function getCartItems() {
        const { data } = await axios.get(`${BACKEND_URL}cart`, {
          headers: {
            authorization: userToken
          }
        });
        console.log("cart data", data);
        if (data.success) {
          data.cartItems.map((item) =>
            cartDispatch({ type: "ADD_TO_CART", payLoad: item })
          );
        }
      })();
  }, [userToken, isLoggedIn]);

  useEffect(() => {
    isLoggedIn &&
      (async function getWishlistedItems() {
        const { data } = await axios.get(`${BACKEND_URL}wishlist`, {
          headers: {
            authorization: userToken
          }
        });
        console.log("wishlist", data);
        if (data.success) {
          data.wishlistItems.map((item) =>
            wishDispatch({ type: "ADD_TO_WISHLIST", payLoad: item })
          );
        }
      })();
  }, [userToken, isLoggedIn]);

  return null;
};
