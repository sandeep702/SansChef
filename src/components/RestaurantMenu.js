import { useState, useEffect } from "react";
import UIShimmer from "./UIShimmer";
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [expandedSections, setExpandedSections] = useState("");
    const [expandedItems, setExpandedItems] = useState("");
    const { resId } = useParams();

    useEffect(() => {
        fetchMenu();
    }, []);

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

    const handleAddToCart = (item) => {
        setCartItems((prev) => [...prev, item]);
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6">
            {/* Restaurant Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {restaurantImage && (
                    <div className="flex justify-center items-center">
                        <div className="relative w-[22rem] h-[20rem] rounded-xl overflow-hidden mt-10 shadow-lg ring-4 ring-gray-200 hover:ring-yellow-400 transition duration-300 hover:scale-105 transform">
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

                    <div className="space-y-4 text-base text-gray-800">
                        <div>
                            <span className="font-semibold">🍽️ Cuisines:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {cuisines?.map((cuisine, index) => (
                                    <span
                                        key={index}
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

            {/* Menu Section */}
            <h2 className="text-3xl font-serif font-semibold mt-16 mb-10 text-center text-yellow-500 flex flex-col gap-1 items-center group">
                Menu तो देखो Yaar 🙄
                <span className="text-[32px] font-serif font-semibold text-red-400 opacity-80 ">
                    Just Scroll Down, Tap on show and Find ur Taste...
                </span>
                <span className="justify-center opacity-80 item-center">👇👇👇</span>
            </h2>

            <div className="space-y-6">
                {menuSections.map((section, index) => {
                    const title = section?.card?.card?.title;
                    const items = section?.card?.card?.itemCards;

                    if (!items) return null;

                    return (
                        <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-xl border shadow-md"
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleSection(index)}
                            >
                                <h3 className="text-2xl text-gray-700 font-serif font-semibold">{title}</h3>
                                <button className="text-blue-600 font-serif font-semibold mr-4 text-lg">
                                    {expandedSections[index] ? "Hide" : "Click to Check"}
                                </button>
                            </div>

                            {expandedSections[index] && (
                                <ul className="grid md:grid-cols-2 gap-6 mt-4 transition-all">
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
                                                className="flex gap-4 border p-4 rounded-xl shadow hover:shadow-xl transition-all cursor-pointer"
                                                onMouseOver={() => toggleItemDescription(id)}
                                                onMouseOut={() => toggleItemDescription(id)}
                                            >
                                                <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-lg">
                                                    {itemImage && (
                                                        <img
                                                            src={itemImage}
                                                            alt={name}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                        />
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAddToCart(info);
                                                        }}
                                                        className="absolute bottom-2 right-2 bg-green-600 text-white px-3 py-1 text-xs rounded hover:bg-green-700"
                                                    >
                                                        Add
                                                    </button>
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-lg text-gray-600 font-semibold">{name}</h4>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        ₹{finalPrice}
                                                    </p>

                                                    {isVeg !== undefined && (
                                                        <p
                                                            className={`text-xs ${isVeg ? "text-green-600" : "text-red-600"
                                                                }`}
                                                        >
                                                            {isVeg ? "Veg" : "Non-Veg"}
                                                        </p>
                                                    )}

                                                    {isBestseller && (
                                                        <p className="text-xs text-orange-500 font-medium">
                                                            ⭐ Bestseller
                                                        </p>
                                                    )}

                                                    {ratings?.aggregatedRating?.rating && (
                                                        <p className="text-sm text-yellow-600 mt-1">
                                                            ⭐ {ratings.aggregatedRating.rating} (
                                                            {ratings.aggregatedRating.ratingCountV2})
                                                        </p>
                                                    )}

                                                    {expandedItems[id] && description && (
                                                        <p className="text-sm text-gray-600 mt-2">
                                                            {description}
                                                        </p>
                                                    )}
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
            <div className="fixed bottom-4 right-4">
                {cartItems.length > 0 && (
                    <div className="bg-orange-600 text-white mb-4 px-4 py-2 rounded-lg shadow-lg text-sm flex flex-col gap-1">
                        <div>
                            🛒 {cartItems.length} item{cartItems.length > 1 && "s"} in cart
                        </div>
                        <p className="bg-white text-orange-600 font-semibold px-3 py-1 rounded-md text-xs hover:bg-orange-100 transition self-start cursor-pointer">
                            Checkout in Cart
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;
