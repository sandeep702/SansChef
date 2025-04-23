import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = () => {
    const newItem = { name: "Burger 🍔", price: Math.floor(Math.random() * 500), qty: 1 };
    const existingItem = cartItems.find((item) => item.name === newItem.name);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.name === newItem.name ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeItem = (name) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="mb-4">
          {cartItems.map((item, index) => (
            <li key={index} className="text-lg flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
              <span>{item.name} - ₹{item.price} x {item.qty}</span>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                onClick={() => removeItem(item.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-4 justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addItem}
        >
          ➕ Add Burger
        </button>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded"
          onClick={() => setCartItems([])}
        >
          🗑️ Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
