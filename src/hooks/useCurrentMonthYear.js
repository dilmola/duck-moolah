import { useState, useEffect } from "react";
import moment from "moment";

export const useCurrentMonthYear = (format = "MMMM YYYY") => {
  const [currentMonthYear, setCurrentMonthYear] = useState("");

  useEffect(() => {
    const monthYear = moment().format(format);
    setCurrentMonthYear(monthYear);
  }, [format]);

  return currentMonthYear;
};
