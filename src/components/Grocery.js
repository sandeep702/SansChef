import { useState } from 'react';

const Grocery = () => {
  // Sample grocery data
  const groceryItems = [
    { id: 1, name: 'Organic Apples', price: 2.99, category: 'Fruits', inStock: true },
    { id: 2, name: 'Whole Wheat Bread', price: 3.49, category: 'Bakery', inStock: true },
    { id: 3, name: 'Free Range Eggs', price: 4.99, category: 'Dairy', inStock: false },
    { id: 4, name: 'Almond Milk', price: 3.79, category: 'Dairy', inStock: true },
    { id: 5, name: 'Fresh Spinach', price: 1.99, category: 'Vegetables', inStock: true },
    { id: 6, name: 'Grass-Fed Beef', price: 8.99, category: 'Meat', inStock: true },
  ];

  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter by category and search term
  const filteredItems = groceryItems.filter(item => {
    const matchesCategory = filter === 'All' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add to cart function
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Remove from cart function
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Get unique categories
  const categories = ['All', ...new Set(groceryItems.map(item => item.category))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Fresh Market Grocery</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Grocery Items */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-gray-600">{item.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-green-700">${item.price.toFixed(2)}</span>
                  {item.inStock ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <span className="text-red-500 text-sm">Out of Stock</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Your Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <ul className="space-y-2 mb-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b pb-2">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span>${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grocery;