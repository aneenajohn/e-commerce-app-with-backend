import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./backendUrl";
import { useCart } from "./cart/cartContext";
import { useWishList } from "./WishList/wishContext";

export const DataLoader = () => {
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishDispatch } = useWishList();
  useEffect(() => {
    (async function getCartItems() {
      const { data } = await axios.get(`${BACKEND_URL}cart`);
      console.log("cart data", data);
      if (data.success) {
        data.cartItems.map((item) =>
          cartDispatch({ type: "ADD_TO_CART", payLoad: item })
        );
      }
    })();
  }, []);

  useEffect(() => {
    (async function getWishlistedItems() {
      const { data } = await axios.get(`${BACKEND_URL}wishlist`);
      console.log("wishlist", data);
      if (data.success) {
        data.wishlistItems.map((item) =>
          wishDispatch({ type: "ADD_TO_WISHLIST", payLoad: item })
        );
      }
    })();
  }, []);

  return null;
};
