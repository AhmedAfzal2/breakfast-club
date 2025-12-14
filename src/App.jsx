import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import Cart from "./components/cart/Cart";

const dummyItems = [
  {
    name: "coffee",
    src: "/assets/images/coffee.png",
    price: 200,
    quantity: 2,
  },
  {
    name: "coffee",
    src: "/assets/images/coffee.png",
    price: 3000,
    quantity: 3,
  },
  {
    name: "coffee",
    src: "/assets/images/coffee.png",
    price: 200,
    quantity: 1,
  },
  {
    name: "coffee",
    src: "/assets/images/coffee.png",
    price: 200,
    quantity: 1,
  },
  {
    name: "coffee",
    src: "/assets/images/coffee.png",
    price: 200,
    quantity: 1,
  },
  {
    name: "coffee",
    src: "/assets/images/coffee.png",
    price: 200,
    quantity: 1,
  },
  {
    name: "coffee",
    src: "/assets/images/coffee.png",
    price: 200,
    quantity: 1,
  },
];

dummyItems.forEach((item, index) => {
  item.id = index;
});

function App() {
  const [cartItems, setCartItems] = useState(dummyItems);
  const onClear = () => {
    setCartItems([]);
  };

  const onDelete = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) onDelete(id);
    else
      setCartItems((items) =>
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
  };

  const onBack = () => {
    console.log("back");
  };

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/reservations" element={<ReservationPage />} />
    //   </Routes>
    // </Router>
    <div style={{ height: "100vh", width: 420 }}>
      <Cart
        items={cartItems}
        onDelete={onDelete}
        onBack={onBack}
        updateQuantity={updateQuantity}
        onClear={onClear}
      />
    </div>
  );
}

export default App;
