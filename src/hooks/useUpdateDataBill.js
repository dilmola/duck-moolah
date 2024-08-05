import { useState } from "react";

const useUpdateBill = (url) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateBill = async (idOfBill, billProps) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idOfBill, ...billProps }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); 
      console.log("Bill updated", data);

    } catch (error) {
      console.error("Error updating status:", error);
      setUpdateError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateBill, isUpdating, updateError };
};

export default useUpdateBill;
