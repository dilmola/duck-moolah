import { useState, useContext } from "react";
import GlobalContext from "@/context/globalContext";
import searchIcon from "../../../public/icons/icon-search.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [showClear, setShowClear] = useState(false);
  const { searchesData, fetchData } = useContext(GlobalContext);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setShowClear(value.trim() !== "");
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      searchesData(query);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowClear(false);
    fetchData();
  };

  return (
    <div className="relative rounded-lg w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.trim() !== "") {
            handleSearch();
          }
        }}
        className="flex-grow px-4 py-2 bg-transparent border border-white/10 focus:outline-none h-fit w-full text-lg rounded-lg"
        placeholder="search here"
      />
      {showClear && (
        <button
          onClick={clearSearch}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-sm text-[#F7B267] border border-[#F7B267] bg-[#795937] hover:bg-[#a77d50] px-4 py-1 rounded-lg transition-colors duration-200"
        >
          Clear Filter
        </button>
      )}
      <img
        src={searchIcon.src}
        alt="icon"
        className="h-4 w-4 object-contain absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100 transition-opacity duration-200"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Search;
