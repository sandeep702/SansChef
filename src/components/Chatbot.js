import React, { useState, useEffect } from "react";

const Chatbot = ({ restaurants }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I can help you find restaurants. Ask about menus, ratings, or cuisine types!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const botReply = generateResponse(input);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
      setLoading(false);
    }, 800);
  };

  const generateResponse = (userInput) => {
    const query = userInput.toLowerCase();
    const availableRestaurants = restaurants || [];

    // Search by name
    if (query.includes("find") || query.includes("search") || query.includes("look for")) {
      const searchTerm = query.replace(/find|search|look for/gi, "").trim();
      const results = availableRestaurants.filter(res => 
        res.info.name.toLowerCase().includes(searchTerm)
      );
      
      if (results.length > 0) {
        return `I found ${results.length} restaurants: ${results.slice(0, 3).map(r => r.info.name).join(", ")}${results.length > 3 ? " and more!" : ""}`;
      }
      return "I couldn't find any restaurants matching that name.";
    }

    // Filter by rating
    if (query.includes("rating") || query.includes("rated") || query.includes("stars")) {
      const topRated = availableRestaurants.filter(res => res.info.avgRating > 4);
      return `We have ${topRated.length} highly rated restaurants (4+ stars). Here are some: ${topRated.slice(0, 3).map(r => r.info.name).join(", ")}`;
    }

    // Filter by cuisine
    if (query.includes("cuisine") || query.includes("type of food") || query.includes("serve")) {
      const cuisineTerm = query.match(/indian|chinese|italian|mexican|american/g)?.[0] || "";
      if (cuisineTerm) {
        const results = availableRestaurants.filter(res => 
          res.info.cuisines.some(c => c.toLowerCase().includes(cuisineTerm))
        );
        return results.length > 0 
          ? `We have ${results.length} ${cuisineTerm} restaurants including: ${results.slice(0, 3).map(r => r.info.name).join(", ")}`
          : `No ${cuisineTerm} restaurants found.`;
      }
      return "We serve various cuisines including Indian, Chinese, Italian, and more. Specify a cuisine type!";
    }

    // Price range
    if (query.includes("price") || query.includes("cost") || query.includes("expensive")) {
      const affordable = availableRestaurants.filter(res => 
        parseInt(res.info.costForTwo.match(/\d+/)[0]) < 500
      );
      return `We have ${affordable.length} affordable options (under ₹500 for two).`;
    }

    // Delivery time
    if (query.includes("delivery") || query.includes("fast") || query.includes("quick")) {
      const fastDelivery = availableRestaurants.filter(res => 
        res.info.sla.deliveryTime <= 25
      );
      return `We have ${fastDelivery.length} options with fast delivery (under 25 mins).`;
    }

    // Default help response
    return "I can help you: 1) Find restaurants by name 2) Filter by rating 3) Search by cuisine 4) Find affordable options 5) Check delivery times. What would you like?";
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg p-4 w-80 border border-gray-300 z-50">
      <div className="h-60 overflow-y-auto p-2 space-y-2 mb-2">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`p-2 rounded-lg max-w-[80%] ${msg.sender === "bot" 
              ? "bg-blue-100 text-blue-900" 
              : "bg-green-100 text-green-900 ml-auto"}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="flex space-x-1 p-2 bg-blue-100 rounded-lg w-max">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded-l-lg focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask about restaurants..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;