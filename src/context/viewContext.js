import { createContext, useState, useEffect } from "react";

const ViewContext = createContext();

export function ViewProvider({ children }) {
  // Initialize state with null, indicating that it will be set after mounting
  const [typeOfView, setTypeOfView] = useState(null);

  useEffect(() => {
    // This effect runs only on the client side after the initial render
    if (typeof window !== "undefined") {
      const savedView = localStorage.getItem("typeOfView");
      if (savedView) {
        setTypeOfView(savedView);
      } else {
        // Optionally set a default value if none is found in localStorage
        setTypeOfView("cardsLarge");
      }
    }
  }, []); // Runs once after initial mount

  useEffect(() => {
    // This effect runs whenever typeOfView changes
    if (typeOfView !== null) {
      localStorage.setItem("typeOfView", typeOfView);
    }
  }, [typeOfView]); // Runs whenever typeOfView changes

  return (
    <ViewContext.Provider value={{ typeOfView, setTypeOfView }}>
      {children}
    </ViewContext.Provider>
  );
}

export default ViewContext;
