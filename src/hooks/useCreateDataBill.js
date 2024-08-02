import { useState } from "react";

const useCreateData = (url) => {
  const [data, setData] = useState(null); // Only store response data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const createData = async (newBill) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBill),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setSuccess(true);
      return result;
    } catch (error) {
      console.error("Error creating data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createData, data, error, loading, success };
};

export default useCreateData;
