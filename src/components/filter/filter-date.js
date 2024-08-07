import { useState, useRef, useEffect } from "react";
import styles from "./filter-date.module.css";
import ArrowIcon from "../../../public/icons/icon-arrowdown.png";

const FilterDate = ({ options, selected, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="bg-[#282828] px-4 py-2 rounded-lg w-full text-left flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected || placeholder}
        <img src={ArrowIcon.src} alt="icon" className="ml-2 h-2 w-2 object-contain" />
      </button>
      {isOpen && (
        <ul
          className={`${styles.customDropdown} absolute mt-1 w-full bg-[#282828] rounded-lg max-h-64 overflow-y-auto z-50`}
        >
          {options.map((option, _) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-[#2d3236]"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDate;
