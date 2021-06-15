import axios from "axios";
import { BACKEND_URL } from "../backendUrl";
import { toast } from "react-toastify";
import { isAddedInList } from "../utils/utils";
import {
  UPDATE,
  ADD_TO_CART,
  REMOVE,
  ADD_TO_WISHLIST
} from "../utils/constants";

export const loginService = async (email, password) => {
  try {
    return await axios.post(`${BACKEND_URL}users/login`, {
      email,
      password
    });
  } catch (err) {
    console.log("err :", err);
  }
};

export const addToCartHandler = async (
  product,
  itemsInCart,
  cartDispatch,
  token
) => {
  const itemFound = itemsInCart.find((item) => item._id === product._id);

  if (itemFound) {
    toast.dark(`${product.name} already present in cart`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true
    });
  } else {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}cart`,
        {
          _id: product._id,
          quantity: 1
        },
        {
          headers: {
            authorization: token
          }
        }
      );
      product.quantity = data.cartItem.quantity;
      if (data.success) {
        cartDispatch({
          type: ADD_TO_CART,
          payLoad: product
        });
        toast.success(`${product.name} added to cart`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const wishlistHandler = async (
  product,
  wishList,
  wishDispatch,
  token
) => {
  console.log("Incoming data", product);

  const itemFound = isAddedInList(product._id, wishList);
  if (itemFound) {
    try {
      deleteFromWishlist(product._id, product.name, wishDispatch);
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}wishlist`,
        {
          _id: product._id
        },
        {
          headers: {
            authorization: token
          }
        }
      );
      if (data.success) {
        wishDispatch({ type: ADD_TO_WISHLIST, payLoad: product });
        toast.success(`${product.name} added to wish list`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const CartUpdate = async (
  { type, payLoad },
  name,
  itemsInCart,
  cartDispatch,
  token
) => {
  const _id = payLoad;
  const itemFound = itemsInCart.find((item) => item._id === _id);
  let updatedQuantity;
  if (type === "INCREMENT") {
    updatedQuantity = itemFound.quantity + 1;
  } else if (type === "DECREMENT") {
    updatedQuantity = itemFound.quantity - 1;
    // return updatedQuantity === 0 && deleteCartItem(_id);
    if (updatedQuantity === 0) {
      return deleteCartItem(_id, name, cartDispatch);
    }
  }
  try {
    // setQtyUpdate(false);
    toast.success(
      `${name}'s quantity is getting updated to ${updatedQuantity}`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      }
    );
    const {
      data: { success, cartItem }
    } = await axios.post(
      `${BACKEND_URL}cart/${_id}`,
      {
        _id: _id,
        quantity: updatedQuantity
      },
      {
        headers: {
          authorization: token
        }
      }
    );
    payLoad = {
      _id: _id,
      quantity: cartItem.quantity
    };
    console.log("updated data", success, cartItem);
    console.log("passing load is", payLoad);
    // setQtyUpdate(true);

    if (success) {
      cartDispatch({ type: UPDATE, payLoad: payLoad });
    }
  } catch (err) {
    console.error("Error Occured", err);
  }
};

export const deleteCartItem = async (_id, name, cartDispatch, token) => {
  try {
    console.log("inside delete");
    const { data } = await axios.delete(`${BACKEND_URL}cart/${_id}`, {
      headers: {
        authorization: token
      }
    });
    console.log(data);
    cartDispatch({ type: REMOVE, payLoad: _id });
    if (data.success) {
      toast.dark(`${name} is removed from cart`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  } catch (err) {
    console.error("Error happened", err);
  }
};

export const deleteFromWishlist = async (
  productId,
  name,
  wishDispatch,
  token
) => {
  try {
    const { data } = await axios.delete(`${BACKEND_URL}wishlist/${productId}`, {
      headers: {
        authorization: token
      }
    });
    if (data.success) {
      wishDispatch({ type: REMOVE, payLoad: productId });
      toast.dark(`${name} is removed from wishlist`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  } catch (err) {
    console.error(err);
  }
};
