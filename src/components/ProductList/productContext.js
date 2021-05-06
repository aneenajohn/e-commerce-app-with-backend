import { createContext, useContext } from "react";
import { products, productReducer } from "./productReducer";
import { useReducer } from "react";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products,
    sortBy: null,
    showInventoryAll: true,
    showFastDeliveryOnly: false
  });

  return (
    <ProductContext.Provider
      value={
        (productReducer,
        {
          products: state.products,
          sortBy: state.sortBy,
          showInventoryAll: state.showInventoryAll,
          showFastDeliveryOnly: state.showFastDeliveryOnly,
          dispatch
        })
      }
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProduct() {
  return useContext(ProductContext);
}
