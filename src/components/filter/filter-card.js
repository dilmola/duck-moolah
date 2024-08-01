import { useState, useEffect } from "react";
import FilterDate from "@/components/filter/filter-date";

const FilterCard = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      console.log(`${selectedMonth}-${selectedYear}`);
    }
  }, [selectedYear, selectedMonth]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (val, index) => 2000 + index
  ).map(String);
  const months = Array.from(new Array(12), (val, index) =>
    (index + 1).toString()
  );

  return (
    <div className="p-4">
      <div className="flex flex-row space-x-6">
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex flex-row space-x-2 items-center">
            <FilterDate
              options={months}
              selected={selectedMonth}
              onSelect={handleMonthChange}
              placeholder="Month"
            />
          </div>
          <FilterDate
            options={years}
            selected={selectedYear}
            onSelect={handleYearChange}
            placeholder="Year"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
