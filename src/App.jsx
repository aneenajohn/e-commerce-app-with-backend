import "./styles.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList/productList";
import { Cart } from "./components/cart/cartList";
import { WishList } from "./components/WishList/wishlist";
// import ProductList from "./components/Products";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}
