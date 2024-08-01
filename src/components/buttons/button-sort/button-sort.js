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
      <button className="px-4" onClick={toggleDropdown}>
        <img src={ViewIcon.src} alt="icon" className="h-4 w-4 object-contain" />
      </button>
      {showDropdown && (
        <div
          className="absolute top-full right-0 bg-[#1b1b1b] rounded-lg shadow-md"
          onClick={(e) => e.stopPropagation()} // Stop event propagation here
        >
          <FilterCard />
        </div>
      )}
    </div>
  );
};

export default ButtonSort;
