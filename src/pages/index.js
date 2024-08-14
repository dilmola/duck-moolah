import React, { useState, useContext } from "react";
import { useRouter } from "next/router"; // Import useRouter
import useLogin from "@/hooks/useLogin";
import Logo from "../../public/logo/logo.png";
import GlobalContext from "@/context/globalContext"; // Adjust the path accordingly

const DemoComponent = () => {
  const [username, setUsername] = useState("");
  const router = useRouter(); // Initialize useRouter
  const { data: loginData, error: loginError } = useLogin(username);
  const { fetchData, fetchUsers } = useContext(GlobalContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const submittedUsername = e.target.username.value;
    setUsername(submittedUsername);
    console.log("Submitted username:", submittedUsername);
  };

  React.useEffect(() => {
    if (loginData) {
      router.push("/home");
      fetchData();
      fetchUsers();
    }
  }, [loginData, router, fetchData]);

  return (
    <div className="flex items-center justify-center min-h-screen rounded-lg text-white bg-[#1b1b1b]/90 backdrop-blur-sm">
      <div className="mb-8 border-b-white/20 p-6 shadow-lg w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-12">
          <div className="space-y-6">
            <div className="space-y-2 text-white/40 font-thin">
              <img src={Logo.src} alt="Logo" className="h-6" />
              <div>
                <a>welcome to expense tracker about duit akan habis!!</a>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="enter username"
                required
                className="text-white bg-transparent border border-white/20 w-full rounded-lg p-2 focus:outline-none focus:border-opacity-30 focus:bg-white/20"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#F7B267] text-black px-4 py-2 rounded-lg w-full"
          >
            Login
          </button>
        </form>

        {loginError && (
          <p className="mt-4 text-red-500">Error logging in: {loginError}</p>
        )}

        {loginData && (
          <div className="mt-4 text-green-500">
            <p>Login successful!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoComponent;
