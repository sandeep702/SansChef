import React from "react";

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={`text-yellow-500 text-lg ${index < rating ? "fill-current" : "text-gray-300"}`}>
          ★
        </span>
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg mx-16 p-4 text-center hover:scale-105 transition-transform w-full ">
      {/* Avatar Handling (If URL is available, use image; otherwise, show initials) */}
      <div className="flex items-center justify-center">
        {testimonial.avatar.startsWith("http") ? (
          <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-md" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700 border-2 border-gray-300 shadow-md">
            {testimonial.avatar}
          </div>
        )}
      </div>

      {/* User Name */}
      <h3 className="text-xl font-semibold mt-3">{testimonial.name}</h3>

      {/* Date & Time Ago */}
      <p className="text-sm text-gray-500 mt-1">📅 {testimonial.date} • ⏳ {testimonial.timeAgo}</p>

      {/* Review Text */}
      <p className="text-gray-700 mt-3">📝 {testimonial.text}</p>

      {/* Star Rating */}
      <div className="mt-3">
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
    
  );
};

export default TestimonialCard;
