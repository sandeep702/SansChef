import React from "react";

const TopRatedFilter = ({ listOfRestaurants, setFilteredRestaurants }) => {
  const handleFilter = () => {
    if (!Array.isArray(listOfRestaurants)) return;

    const filteredList = listOfRestaurants.filter(
      (res) => res.info?.avgRating > 4.4
    );
    setFilteredRestaurants(filteredList);
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <button
        onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      >
        🍲 Explore Now
        <svg
          className="ml-2 w-6 h-6 animate-ping"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
  
      <button
  className="filter-btn relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg active:scale-[.98] transition-transform duration-150 group"
  onClick={handleFilter}
>
  {/* Floating hearts with delayed animation */}
  <span className="absolute top-0 left-2 text-pink-400 opacity-80 animate-float">💕</span>
  <span className="absolute bottom-0 right-2 text-pink-400 opacity-80 animate-float delay-300">💕</span>
  
  {/* Button content */}
  <div className="relative z-10 flex items-center justify-center gap-2">
    <span className="font-medium tracking-wide">Top Rated Restaurants</span>
    <span className="text-yellow-300 text-lg animate-soft-bounce">⭐</span>
  </div>
  
  {/* Subtle shimmer effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></span>
</button>
    </div>
  );
  
}
export default TopRatedFilter;
