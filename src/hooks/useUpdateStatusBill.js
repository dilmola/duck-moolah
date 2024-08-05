// hooks/useUpdateStatus.js
import { useState } from "react";

const useUpdateStatus = (url) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateStatus = async (id, newStatus) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status_bill: newStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Status updated to:", newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
      setUpdateError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating, updateError };
};

export default useUpdateStatus;
