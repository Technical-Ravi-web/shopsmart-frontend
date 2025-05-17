// src/App.js
import React, { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Product 1", price: 499 },
  { id: 2, name: "Product 2", price: 999 },
  { id: 3, name: "Product 3", price: 299 },
];

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart(prevCart => {
      // Check if product already in cart
      const found = prevCart.find(item => item.id === product.id);
      if (found) {
        // Increase quantity
        return prevCart.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  }

  function removeFromCart(productId) {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }

  function totalPrice() {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>ShopSmart Dummy E-commerce</h1>

      <h2>Products</h2>
      <div style={{ display: "flex", gap: 20 }}>
        {PRODUCTS.map(product => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: 10, width: 150 }}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.length > 0 && (
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              {item.name} - Qty: {item.qty} - ₹{item.price * item.qty}
              <button
                style={{ marginLeft: 10 }}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{totalPrice()}</h3>
        </div>
      )}
    </div>
  );
}

export default App;



