import { useState, useEffect, useContext } from "react";
import FilterDate from "@/components/filter/filter-date";
import GlobalContext from "@/context/globalContext";

const FilterCard = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const { filterDataByDate } = useContext(GlobalContext);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      filterDataByDate(selectedMonth, selectedYear);
    }
  }, [selectedYear, selectedMonth, filterDataByDate]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, index) => currentYear - index
  ).map(String);
  const months = Array.from(new Array(12), (_, index) =>
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
