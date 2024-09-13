import { useState, useEffect, useContext } from "react";
import GlobalContext from "@/context/globalContext";
import searchIcon from "../../../public/icons/icon-search.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [showClear, setShowClear] = useState(false);
  const { searchesData, fetchData } = useContext(GlobalContext);
  const [isMd, setIsMd] = useState(false);

  const updateClearButton = () => {
    const screenWidth = window.innerWidth;
    setIsMd(screenWidth >= 768);
  };

  useEffect(() => {
    updateClearButton();
    window.addEventListener("resize", updateClearButton);
    return () => window.removeEventListener("resize", updateClearButton);
  }, []);

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
        <>
          {isMd ? (
            <button
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-sm text-[#F7B267] border border-[#F7B267] bg-[#795937] hover:bg-[#a77d50] px-4 py-1 rounded-lg transition-colors duration-200"
            >
              Clear Search
            </button>
          ) : (
            <button
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-2xl text-[#795937] bg-transparent border-none cursor-pointer font-semibold"
            >
              &#x2715;
            </button>
          )}
        </>
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
