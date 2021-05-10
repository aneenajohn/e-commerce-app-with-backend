export const cartReducer = (state, action) => {
  console.log(action.type);
  console.log(action.payLoad);
  console.log({ state });
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        itemsInCart: state.itemsInCart.find(
          (item) => Number(item._id) === Number(action.payLoad._id)
        )
          ? state.itemsInCart.filter((item) => item._id !== action.payLoad._id)
          : state.itemsInCart.concat({
              _id: action.payLoad._id,
              name: action.payLoad.name,
              quantity: 1,
              imageUrl: action.payLoad.imageUrl,
              price: action.payLoad.price,
              inStock: action.payLoad.inStock,
              fastDelivery: action.payLoad.fastDelivery,
              ratings: action.payLoad.ratings,
              offer: action.payLoad.offer
            })
      };
    case "UPDATE":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payLoad._id
            ? { ...item, quantity: action.payLoad.quantity }
            : item
        )
      };

    case "REMOVE":
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item._id !== action.payLoad
        )
      };

    default:
      return state;
  }
};

// id: "bb463b8b-b76c-4f6a-9726-65ab5730b69b"
// name: "Generic Concrete Table"
// image: "http://placeimg.com/640/480/business"
// price: "84.00"
// inStock: true
// fastDelivery: true
// ratings: 3
// offer: "Best Seller"
