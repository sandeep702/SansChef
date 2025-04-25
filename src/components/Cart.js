import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems: initialCartItems = {}, 
    menuSections = [], 
    restaurantInfo = null 
  } = useLocation().state || {};
  
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isRemoving, setIsRemoving] = useState(null);

  const findItemById = (id) => {
    for (const section of menuSections) {
      const items = section?.card?.card?.itemCards || [];
      for (const item of items) {
        const info = item.card?.info;
        if (info?.id == id) return info;
      }
    }
    return null;
  };

  useEffect(() => {
    let sum = 0;
    Object.entries(cartItems).forEach(([id, qty]) => {
      const info = findItemById(id);
      if (!info) return;
      const unit = (info.price ?? info.defaultPrice ?? 0) / 100;
      sum += unit * qty;
    });
    setTotalPrice(sum);
  }, [cartItems]);

  const handleQuantityChange = (id, change) => {
    setCartItems(prev => {
      const newQty = (prev[id] || 0) + change;
      if (newQty < 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const handleRemove = (id) => {
    setIsRemoving(id);
    setTimeout(() => {
      setCartItems(prev => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
      setIsRemoving(null);
    }, 300);
  };

  const handleClear = () => setCartItems({});

  const handleCheckout = () => {
    alert(`Order placed! Total: ₹${totalPrice.toFixed(2)}`);
    handleClear();
    navigate("/");
  };

  if (!Object.keys(cartItems).length) {
    return (
      <div className="text-center pt-16 font-serif   font-semibold text-pink-600">
        <h2 className="text-2xl font-semibold mb-4">🛒 Your cart is empty</h2>
        <button
          onClick={() => navigate(-1)}
          className="inline-block mt-2 px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          ← Back to Menu
        </button>
      </div>
    );x
  }

  return (
    <div className="pt-12 mb-10">
    <div className="max-w-lg mx-auto p-12  bg-white rounded-2xl shadow-xl">
      {restaurantInfo && (
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">{restaurantInfo.name}</h1>
          <p className="text-gray-500 text-sm">
            {restaurantInfo.areaName} • {restaurantInfo.sla?.deliveryTime} mins
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {restaurantInfo.cuisines?.join(", ")}
          </p>
        </div>
      )}

      <h2 className="text-xl text-gray-700 font-serif font-semibold mb-4">🛒 Your Cart</h2>

      <ul className="space-y-4 mb-6">
        {Object.entries(cartItems)
          .map(([id, qty]) => {
            const info = findItemById(id);
            if (!info) return null;
            const price = ((info.price ?? info.defaultPrice ?? 0) / 100) * qty;
            const isVeg = info.isVeg !== undefined ? info.isVeg : null;

            return (
              <li
                key={id}
                className={`flex justify-between items-start p-4 rounded-lg shadow-sm border transition-all duration-300 ${
                  isRemoving === id ? "opacity-0 scale-95" : "opacity-100"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {isVeg !== null && (
                      <span className={`text-xs font-semibold px-1 border rounded ${
                        isVeg ? "text-green-600 border-green-600" : "text-red-600 border-red-600"
                      }`}>
                        {isVeg ? "VEG" : "NON-VEG"}
                      </span>
                    )}
                    <h4 className=" font-bold text-[1.2rem]  font-sans  text-yellow-600">{info.name}.{" "}😉</h4>
                  </div>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(id, -1)}
                      className="w-8 h-8 flex font-semibold text-gray-800 items-center justify-center bg-red-200 text-lg rounded-full hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="mx-3 w-6 text-center font-bold italic text-gray-700">{qty}</span>
                    <button
                      onClick={() => handleQuantityChange(id, 1)}
                      className="w-8 h-8 font-semibold text-gray-800 flex items-center justify-center bg-green-200 text-lg rounded-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">₹{price.toFixed(2)}</p>
                  <button
                    onClick={() => handleRemove(id)}
                    className="mt-2 text-sm text-red-500 hover:text-red-600"
                  >
                    ✖ Remove
                  </button>
                </div>
              </li>
            );
          })
          .filter(Boolean)}
      </ul>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
        <div className="flex justify-between mb-2 text-sm text-gray-700">
          <span>Subtotal</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm text-gray-700">
          <span>Delivery Fee</span>
          <span>{totalPrice > 500 ? "Free" : "₹49.00"}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm text-gray-700">
          <span>GST and Restaurant Charges</span>
          <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-3 mt-2 border-t font-semibold text-gray-900">
          <span>Total Billing ▶</span>
          <span>
            ₹{(totalPrice > 500 ? totalPrice : totalPrice + 49 + totalPrice * 0.05).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          ✅ Proceed to Checkout
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="flex-1 bg-gray-200 hover:bg-gray-200 py-2 rounded-lg text-sm text-gray-700 transition"
          >
            🧹 Clear Cart
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-red-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition"
          >
            ◀ Menu
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cart;