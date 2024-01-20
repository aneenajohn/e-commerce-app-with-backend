import { createContext, useContext, useReducer } from 'react';
import { productReducer } from './productReducer';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    sortBy: 'All',
    showInventoryAll: true,
    showFastDeliveryOnly: false,
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
          dispatch,
        })
      }
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
