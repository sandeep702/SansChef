import { useState } from "react";
import SearchBar from "./SearchBar";


const Filters = ({ listOfRestaurants, setFilteredRestaurants }) => {
  const [sortOption, setSortOption] = useState("");
  
  
  const extractCost = (costString) =>
    Number(costString.replace(/\D/g, ""));

  const filterByFastDelivery = () => {
    const sorted = [...listOfRestaurants].sort(
      (a, b) => (a.info.sla?.deliveryTime || 0) - (b.info.sla?.deliveryTime || 0)
    );
    setFilteredRestaurants(sorted);
  };

  const filterByRating = () => {
    setFilteredRestaurants(listOfRestaurants.filter((res) => res.info.avgRating >= 4.0));
  };

  const filterByVeg = () => {
    setFilteredRestaurants(listOfRestaurants.filter((res) => res.info.veg));
  };

  const filterByOffers = () => {
    setFilteredRestaurants(listOfRestaurants.filter((res) => res.info.aggregatedDiscountInfoV3));
  };

  const filterByPrice = (min, max) => {
    const filtered = listOfRestaurants.filter((res) => {
      const cost = extractCost(res.info.costForTwo);
      return cost >= min && cost <= max;
    });
    setFilteredRestaurants(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sortedList = [...listOfRestaurants];

    if (option === "lowToHigh") {
      sortedList.sort((a, b) => extractCost(a.info.costForTwo) - extractCost(b.info.costForTwo));
    } else if (option === "highToLow") {
      sortedList.sort((a, b) => extractCost(b.info.costForTwo) - extractCost(a.info.costForTwo));
    } else if (option === "rating") {
      sortedList.sort((a, b) => b.info.avgRating - a.info.avgRating);
    }

    setFilteredRestaurants(sortedList);
  };

  const sharedStyles = "px-4 py-2 text-sm font-medium border border-gray-300 rounded-full";

  return (
    <div className="sticky top-0 z-50 px-28 mb-4 pt-10">
      <div className="flex flex-col lg:flex-row justify-between items-center flex-wrap gap-4">

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <button className={sharedStyles}>Filter <span className="ml-1">⚙️</span></button>
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className={`${sharedStyles} pr-2`}
          >
            <option value="">Sort By ⬇️</option>
            <option value="lowToHigh">Low to High ₹</option>
            <option value="highToLow">High to Low ₹</option>
            <option value="rating">Rating ⭐</option>
          </select>
          <button className={sharedStyles} onClick={filterByFastDelivery}>Fast Delivery</button>
          <button className={sharedStyles}>Favourites ❤️</button>
          <button className={sharedStyles} onClick={filterByRating}>Ratings 4.0+</button>
          <button className={sharedStyles} onClick={filterByVeg}>Pure Veg 🥬</button>
          <button className={sharedStyles} onClick={filterByOffers}>Offers 🎉</button>
          <button className={sharedStyles} onClick={() => filterByPrice(300, 600)}>Rs. 300–Rs. 600</button>
          <button className={sharedStyles} onClick={() => filterByPrice(0, 300)}>Less than Rs. 300</button>
        </div>

        {/* Search Bar */}
        <div className="w-full lg:w-auto">
          <SearchBar
            listOfRestaurants={listOfRestaurants}
            setFilteredRestaurants={setFilteredRestaurants}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
 