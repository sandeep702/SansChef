import { useState, useEffect } from "react";

const SearchBar = ({ listOfRestaurants, setFilteredRestaurants }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    const trimmedText = searchText.trim();
    if (trimmedText === "") {
      setFilteredRestaurants(listOfRestaurants);
      return;
    }
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(trimmedText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredRestaurants(listOfRestaurants);
    }
  }, [searchText, listOfRestaurants, setFilteredRestaurants]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Hungry ??..Type here..."
        className="px-3 py-1 text-sm w-40 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Go
      </button>
    </div>
  );
};

export default SearchBar;
