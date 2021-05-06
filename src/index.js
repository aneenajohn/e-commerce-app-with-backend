import { StrictMode } from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";
import App from "./App";
import { CartProvider } from "./components/cart/cartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { WishProvider } from "./components/WishList/wishContext";
import { ProductProvider } from "./components/ProductList/productContext";
setupMockServer();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <ProductProvider>
        <CartProvider>
          <WishProvider>
            <App />
          </WishProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  </StrictMode>,
  rootElement
);
