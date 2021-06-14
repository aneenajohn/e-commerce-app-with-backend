import "./styles.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList/productList";
import { Cart } from "./components/cart/cartList";
import { WishList } from "./components/WishList/wishlist";
import { Login } from "./components/Login/Login";
// import ProductList from "./components/Products";
import { DataLoader } from "./components/DataLoader";
export default function App() {
  return (
    <div className="App">
      <DataLoader />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
