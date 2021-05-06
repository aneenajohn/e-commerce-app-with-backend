export const wishReducer = (state, action) => {
  console.log(state);
  console.log(action.type);
  console.log(action.payLoad);
  console.log(state.wishList);
  // return state;
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const isWishPresent = state.wishList.find(
        (wish) => Number(wish.id) === Number(action.payLoad.id)
      );
      console.log("Is wish present", isWishPresent);
      return {
        ...state,
        wishList: state.wishList.find(
          (wish) => Number(wish.id) === Number(action.payLoad.id)
        )
          ? state.wishList.filter((wish) => wish.id !== action.payLoad.id)
          : state.wishList.concat({
              id: action.payLoad.id,
              name: action.payLoad.name,
              quantity: action.payLoad.quantity,
              image: action.payLoad.image,
              price: action.payLoad.price,
              inStock: action.payLoad.inStock,
              fastDelivery: action.payLoad.fastDelivery,
              ratings: action.payLoad.ratings,
              offer: action.payLoad.offer
            })
      };
    case "REMOVE":
      return {
        ...state,
        wishList: state.wishList.filter((item) => item.id !== action.payLoad)
      };
    default:
      return { state };
  }
};
