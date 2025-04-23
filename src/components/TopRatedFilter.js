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
    <button className="filter-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleFilter}>
      Top Rated Restaurants⭐
    </button>
  );
};

export default TopRatedFilter;
