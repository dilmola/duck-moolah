import { useState, useEffect } from "react";

const useLogin = (username) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLoginUser = async () => {
      if (!username) return;

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    getLoginUser();
  }, [username]);

  return { data, error };
};

export default useLogin;
