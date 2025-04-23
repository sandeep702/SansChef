import { useState, useEffect } from "react";
import ResCard from "./ResCard";
import resList from "../utils/mockData";
import UIShimmer from "./UIShimmer";
import Body2 from "./Body2";
import Filters from "./Filters";
import ImageCarousel from "./ImageCarousel"; 
import { Link } from "react-router-dom";
const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState("");
  const [filteredResturant, setFilteredResturant] = useState(resList);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_SEE_ALL_LISTING"
      );
      
      const json = await response.json();
      console.log("API response:", json);
      

      // Enhanced restaurant data extraction with duplicate removal
      const allRestaurants = json?.data?.cards?.flatMap(card => 
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
      ).flat() || [];

      // Remove duplicates by creating a Set of restaurant IDs
      const uniqueRestaurants = Array.from(new Map(
        allRestaurants.map(restaurant => [restaurant.info.id, restaurant])
      ).values());

      // Fallback to mock data if no restaurants found
      const restaurants = uniqueRestaurants.length > 0 ? uniqueRestaurants : resList;

      setListOfRestaurant(restaurants);
      setFilteredResturant(restaurants);

    } catch (error) {
      console.log("API failed, using mock data");
      setListOfRestaurant(resList);
      setFilteredResturant(resList);
    }
  };

  if (listOfRestaurants.length === 0) {
    return <UIShimmer />;
  }

  return (
    <div className="body">
      <Body2/>
      
<ImageCarousel 
  listOfRestaurants={listOfRestaurants} 
  setFilteredResturant={setFilteredResturant}
/>
     
      <Filters 
        listOfRestaurants={listOfRestaurants} 
        setFilteredRestaurants={setFilteredResturant} 
      />
<div className="filter">
     
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredResturant.map((restaurant) => (
      <Link to={`/restaurants/${restaurant.info.id}`} key={restaurant.info.id}>
      <ResCard resData={restaurant} />
    </Link>
    
        ))}
      </div>
    </div>
  );
};

export default Body;