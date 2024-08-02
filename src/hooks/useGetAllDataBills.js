import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllDataBills = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! Status: ${response.status}, Response: ${errorText}`
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    getAllDataBills();
  }, [url]);

  return { data, error };
};

export default useFetchData;
