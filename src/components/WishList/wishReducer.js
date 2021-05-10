export const wishReducer = (state, action) => {
  // console.log(state);
  // console.log(action.type);
  // console.log(action.payLoad);
  // console.log(state.wishList);
  // return state;
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const isWishPresent = state.wishList.find(
        (wish) => Number(wish._id) === Number(action.payLoad._id)
      );
      console.log("Is wish present", isWishPresent);
      return {
        ...state,
        wishList: state.wishList.find(
          (wish) => Number(wish._id) === Number(action.payLoad._id)
        )
          ? state.wishList.filter((wish) => wish._id !== action.payLoad._id)
          : state.wishList.concat({
              _id: action.payLoad._id,
              name: action.payLoad.name,
              imageUrl: action.payLoad.imageUrl,
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
        wishList: state.wishList.filter((item) => item._id !== action.payLoad)
      };
    default:
      return { state };
  }
};
