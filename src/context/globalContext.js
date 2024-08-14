import { createContext, useState, useEffect, useCallback } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [typeOfView, setTypeOfView] = useState(null);
  const [userdata, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const getUserDataUrl = "/api/get-users-data";
    try {
      const response = await fetch(getUserDataUrl);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setUserData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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

    if (searchQuery) {
      searchesData(searchQuery);
      setLoading(false);
      return;
    }

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
      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateBill = async (idOfBill, billProps) => {
    setLoading(true);
    setError(null);
    const updateDataUrl = "/api/update-data-bill";

    try {
      const response = await fetch(updateDataUrl, {
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
      setSuccess(true);
      fetchData();
      console.log(
        "This runs immediately after fetchData() is called, not waiting for it to finish."
      );

      console.log("Bill updated", data);
    } catch (error) {
      console.error("Error updating status:", error);
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
      fetchData(); // Re-fetch all data or search results
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

  const searchesData = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError(null);
    const searchesDataUrl = `/api/searches-data-bill?q=${query}`;
    try {
      const response = await fetch(searchesDataUrl);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setFilteredData(result);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (month, year) => {
    const date = new Date(year, month - 1); // Months are 0-indexed
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const filterDataByDate = useCallback(
    async (month, year) => {
      setLoading(true);
      setError(null);

      const filterDataUrl = `/api/filter-data-bills-bydate?month=${month}&year=${year}`;
      try {
        const response = await fetch(filterDataUrl);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! Status: ${response.status}, Response: ${errorText}`
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        if (JSON.stringify(result) !== JSON.stringify(filteredData)) {
          setData(result);
          setFilteredData(result);
        }
        setFormattedDate(formatDate(month, year));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [filteredData]
  );

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
    setFilteredData((prevFilteredData) =>
      prevFilteredData.map((card) =>
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
        updateBill,
        searchesData,
        filteredData,
        filterDataByDate,
        formattedDate,
        userdata,
        fetchUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
