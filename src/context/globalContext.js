import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [typeOfView, setTypeOfView] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const createData = async (newBill) => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    const createDataUrl = "/api/create-data-bill";
    try {
      const response = await fetch(createDataUrl, {
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
      setSuccess(true);
      fetchData(); // Fetch the updated data after creation
      return result;
    } catch (error) {
      console.error("Error creating data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const getDataUrl = "/api/get-all-data-bills";
    try {
      const response = await fetch(getDataUrl);
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
    } finally {
      setLoading(false);
    }
  };

  const deleteBill = async (id) => {
    setSuccess(false);
    setError(null);
    const getDeleteUrl = "/api/delete-data-bill";

    try {
      const response = await fetch(getDeleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
      }
      const result = await response.json();

      console.log("Delete successful");
      fetchData();
      return result;
    } catch (error) {
      console.error("Error deleting bill:", error);
      setError(error.message);
    } finally {
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedView = localStorage.getItem("typeOfView");
      if (savedView) {
        setTypeOfView(savedView);
      } else {
        setTypeOfView("cardsLargeItem");
      }
    }
  }, []);

  useEffect(() => {
    if (typeOfView !== null) {
      localStorage.setItem("typeOfView", typeOfView);
    }
  }, [typeOfView]);

  const updateCardStatus = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((card) =>
        card.id === id ? { ...card, status_bill: newStatus } : card
      )
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        typeOfView,
        setTypeOfView,
        data,
        error,
        updateCardStatus,
        closeModal,
        openModal,
        showModal,
        createData,
        error,
        loading,
        success,
        deleteBill,
        fetchData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
