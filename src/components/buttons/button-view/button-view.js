import { useState, useRef, useEffect } from "react";

import ViewIcon from "../../../../public/icons/icon-view.png";
import DetailCardIcon from "../../../../public/icons/icon-detailcard.png";
import LargeCardIcon from "../../../../public/icons/icon-largecard.png";

const nameView = [
  {
    data: "By detail",
    value: "cardsDetailItem",
    icon: DetailCardIcon,
  },
  {
    data: "By large cards",
    value: "cardsLargeItem",
    icon: LargeCardIcon,
  },
];

const ButtonView = ({ setTypeOfView }) => {
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
      <div
        className={`absolute top-full right-0 w-max rounded-lg shadow-md transition-all duration-100  ${
          showDropdown
            ? ""
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="absolute top-full right-0 w-max bg-[#1b1b1b] rounded-lg shadow-md">
          <div className="p-2 flex flex-col font-thin">
            {nameView.map((filterOption) => (
              <button
                key={filterOption.data}
                className="bg-[#1b1b1b] hover:bg-[#2d3236] hover:rounded-lg  px-4 py-2  flex flex-row items-center space-x-2 "
                onClick={() => setTypeOfView(filterOption.value)}
              >
                <img
                  src={filterOption.icon.src}
                  alt={`${filterOption.data} icon`}
                  className="h-3 w-3 object-contain"
                />
                <a>{filterOption.data}</a>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonView;
