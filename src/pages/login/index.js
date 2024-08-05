import React, { useState } from "react";
import useLogin from "@/hooks/useLogin";

const DemoComponent = () => {
  const [username, setUsername] = useState("");
  const { data: loginData, error: loginError } = useLogin(username);

  const handleLogin = (e) => {
    e.preventDefault();
    const submittedUsername = e.target.username.value;
    setUsername(submittedUsername);
    console.log("Submitted username:", submittedUsername);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          required
        />
        <button type="submit">Login</button>
      </form>

      {loginError && <p>Error logging in: {loginError}</p>}

      {loginData && (
        <div>
          <p>Login successful!</p>
          {/* Add any additional UI updates or redirects here */}
        </div>
      )}
    </div>
  );
};

export default DemoComponent;
