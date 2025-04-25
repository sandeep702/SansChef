import { useState, useEffect } from "react";
import UIShimmer from "./UIShimmer";
import { useParams, useNavigate } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const { resId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API_URL(resId));
    const json = await data.json();
    setResInfo(json.data);
  };

  if (resInfo === null) return <UIShimmer />;

  const info = resInfo?.cards?.[2]?.card?.card?.info || {};
  const {
    name,
    cuisines,
    costForTwoMessage,
    sla,
    areaName,
    avgRating,
    totalRatingsString,
    cloudinaryImageId,
  } = info;
  const restaurantImage = cloudinaryImageId
    ? `https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`
    : "";

  const menuSections =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    resInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    [];

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleItemDescription = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleAddToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return updated;
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems({});
  };

  const truncateText = (text, maxLength = 100) =>
    text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const handleCheckout = () => {
    navigate("/cart", { 
      state: { 
        cartItems, 
        menuSections: menuSections.filter(section => 
          section?.card?.card?.itemCards?.length > 0
        )
      } 
    });
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      {/* Restaurant Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {restaurantImage && (
          <div className="flex justify-center items-center">
            <div className="relative w-[22rem] h-[20rem] rounded-xl overflow-hidden mt-10 shadow-lg ring-4 ring-gray-200 hover:ring-yellow-400 transition duration-300 hover:scale-105">
              <img
                src={restaurantImage}
                alt={name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h1 className="text-4xl text-gray-700 font-bold mb-6 flex items-center gap-2">
            {name} <span className="text-2xl animate-bounce">😋</span>
          </h1>
          <div className="space-y-4 text-base text-gray-800 font-serif">
            <div>
              <span className="font-semibold">🍽️ Cuisines:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {cuisines?.map((cuisine, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm transition"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>
            <p>
              <span className="font-semibold">💰 Cost for Two:</span>{" "}
              {costForTwoMessage}
            </p>
            <p>
              <span className="font-semibold">📍 Location:</span> {areaName}
            </p>
            <p>
              <span className="font-semibold">⏱️ Delivery Time:</span>{" "}
              {sla?.deliveryTime} mins
            </p>
            <p className="text-yellow-600 font-semibold text-lg">
              ⭐ {avgRating}{" "}
              <span className="text-sm text-gray-600">
                ({totalRatingsString})
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Menu Title */}
      <h2 className="text-3xl font-serif font-semibold mt-16 mb-10 text-center text-yellow-500 flex flex-col gap-1 items-center">
        Menu तो देखो Yaar 🙄
        <span className="text-[32px] font-serif font-semibold text-red-400 opacity-80">
          Just Scroll Down, Tap on Check and Find ur Taste...
        </span>
        <span className="opacity-80 animate-bounce">👇👇👇</span>
      </h2>

      {/* Menu Sections */}
      <div className="space-y-6">
        {menuSections.map((section, idx) => {
          const title = section?.card?.card?.title;
          const items = section?.card?.card?.itemCards;
          if (!items) return null;

          return (
            <div
              key={idx}
              className="bg-gray-100 p-4 rounded-xl border shadow-md transition-all"
            >
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
                onClick={() => toggleSection(idx)}
              >
                <h3 className="text-2xl text-gray-700 font-serif font-semibold">
                  {title}
                </h3>
                <button className="text-blue-600 font-serif font-semibold text-lg hover:underline">
                  {expandedSections[idx] ? "Hide" : "Click to Check"}
                </button>
              </div>

              {expandedSections[idx] && (
                <ul className="grid md:grid-cols-2 gap-6 mt-4">
                  {items.map((item) => {
                    const info = item?.card?.info;
                    const {
                      id,
                      name,
                      price,
                      defaultPrice,
                      description,
                      imageId,
                      isVeg,
                      isBestseller,
                      ratings,
                    } = info;
                    const finalPrice = (price ?? defaultPrice ?? 0) / 100;
                    const itemImage = imageId
                      ? `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`
                      : "";

                    return (
                      <li
                        key={id}
                        className="flex gap-4 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                        onMouseOver={() => toggleItemDescription(id)}
                        onMouseOut={() => toggleItemDescription(id)}
                      >
                        <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl">
                          {itemImage && (
                            <img
                              src={itemImage}
                              alt={name}
                              className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                            />
                          )}
                        </div>

                        <div className="flex-1 text-gray-700">
                          <h4 className="text-[1.1rem] font-semibold">{name}</h4>
                          <p className="text-[18px] font-semibold text-gray-600 mt-2 mb-2">
                            ₹{finalPrice}
                          </p>

                          <div className="text-[16px] font-semibold flex flex-wrap gap-3 mb-2">
                            {isVeg !== undefined && (
                              <span
                                className={isVeg ? "text-green-600" : "text-red-600"}
                              >
                                {isVeg ? "Veg" : "Non-Veg"}
                              </span>
                            )}
                            {isBestseller && (
                              <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-500 text-white px-2 py-0.5 rounded-full text-[14px] animate-pulse">
                                ⭐ Bestseller
                              </span>
                            )}
                            {ratings?.aggregatedRating?.rating && (
                              <span className="text-yellow-600 text-[1rem] font-medium">
                                ⭐ {ratings.aggregatedRating.rating} (
                                {ratings.aggregatedRating.ratingCountV2})
                              </span>
                            )}
                          </div>

                          {expandedItems[id] && description && (
                            <p className="text-[16px] text-gray-600 leading-relaxed line-clamp-2">
                              {truncateText(description)}
                            </p>
                          )}

                          <div className="mt-4 flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromCart(id);
                              }}
                              disabled={!cartItems[id]}
                              className={`px-3 py-1 rounded-full text-white text-sm font-serif transition-all duration-200 ${
                                cartItems[id]
                                  ? "bg-red-500 hover:bg-red-600"
                                  : "bg-gray-300 cursor-not-allowed"
                              }`}
                            >
                              –
                            </button>
                            <span className="text-[16px] font-medium">
                              {cartItems[id] || 0}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(id);
                              }}
                              className="px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-serif transition-all duration-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Cart Feedback */}
      <div className="fixed bottom-4 right-4 z-50">
        {totalItems > 0 && (
          <div className="bg-orange-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex flex-col gap-2">
            <div>🛒 {totalItems} item{totalItems > 1 && "s"} in cart</div>
            <button
              onClick={handleCheckout}
              className="bg-white text-orange-600 font-semibold px-3 py-1 rounded-md text-xs hover:bg-orange-100 transition self-start"
            >
              Checkout
            </button>
            <button
              onClick={handleClearCart}
              className="text-xs mt-1 text-white underline hover:text-yellow-200"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;