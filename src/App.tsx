import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

type CartProp = {
  item: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

export default function App() {
  const [cart, setCart] = useState<CartProp[]>([]);

  const addToCart = (item: CartProp) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.item === item.item && cartItem.size === item.size
      );
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...prevCart[existingItemIndex],
          quantity: prevCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // New item, add to cart
        return [...prevCart, item];
      }
    });
  };

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}
