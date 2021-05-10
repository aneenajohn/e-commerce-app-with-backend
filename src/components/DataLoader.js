import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./backendUrl";
import { useCart } from "./cart/cartContext";

export const DataLoader = () => {
  const { dispatch: cartDispatch } = useCart();
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
  return null;
};
