import ViewIcon from "../../../../public/icons/icon-sort.png";
import FilterCard from "@/components/filter/filter-card";
import { useState, useRef, useEffect } from "react";

const ButtonSort = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button className="md:px-4 px-2" onClick={toggleDropdown}>
        <img
          src={ViewIcon.src}
          alt="icon"
          className="md:h-4 md:w-4 h-6 w-6 object-contain cursor-pointer opacity-30 hover:opacity-100 transition-opacity duration-200"
        />
      </button>
      <div
        className={`absolute top-full right-0 w-max rounded-lg shadow-md transition-all duration-100 ${
          showDropdown ? "" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className="absolute top-full right-0 bg-[#1b1b1b] rounded-lg shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <FilterCard />
        </div>
      </div>
    </div>
  );
};

export default ButtonSort;
