import { createContext, useContext, useReducer } from "react";
import { wishReducer } from "./wishReducer";

export const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const wishList = [];
  const [state, dispatch] = useReducer(wishReducer, { wishList });
  return (
    <WishContext.Provider
      value={(wishReducer, { wishList: state.wishList, dispatch })}
    >
      {children}
    </WishContext.Provider>
  );
};

export function useWishList() {
  return useContext(WishContext);
}
