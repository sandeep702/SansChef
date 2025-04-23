import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar, FaMotorcycle } from "react-icons/fa";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const ResCard = ({ resData }) => {
    const {
        id,
        name,
        cloudinaryImageId,
        cuisines,
        avgRating,
        costForTwo,
        sla: { deliveryTime },
    } = resData?.info;

    // State for favorite (like) button
    const [isLiked, setIsLiked] = useState(false);

    // Function to generate star rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        return (
            <>
                {Array(fullStars)
                    .fill()
                    .map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                    ))}
                {hasHalfStar && <FaStar className="text-yellow-300 opacity-70" />}
            </>
        );
    };

    return (
        <motion.div
        className="relative w-80 bg-gray-100 shadow-lg border border-gray-200 rounded-xl overflow-hidden ml-20" // Added ml-4 for left margin
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
    
            {/* Image Section */}
            <Link to={`/restaurant/${id}`} className="block">
            <motion.div className="relative w-full h-52 overflow-hidden">
                <motion.img
                    alt="Restaurant Logo"
                    src={CDN_URL + cloudinaryImageId}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </motion.div>
</Link>
            {/* Like Button */}
            <motion.button
                className={`absolute top-3 right-3 text-xl ${
                    isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
                }`}
                onClick={() => setIsLiked(!isLiked)}
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
            </motion.button>

            {/* Content Section */}
            <Link to={`/restaurant/${id}`} className="block">
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
                <p className="text-sm text-gray-600 truncate">{cuisines.join(", ")}</p>

                {/* Rating & Cost */}
                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center space-x-1">
                        {renderStars(avgRating)}
                        <span className="text-gray-700 text-sm ml-1">({avgRating})</span>
                    </div>
                    <span className="text-gray-800 font-medium text-sm">{costForTwo}</span>
                </div>

                {/* Delivery Time */}
                <div className="mt-3 flex items-center text-gray-700 text-sm">
                    <FaMotorcycle className="text-lg" />
                    <span className="ml-2">{deliveryTime} min delivery</span>
                </div>
            </div>
        </Link>
        </motion.div>
    );
};

export default ResCard;
