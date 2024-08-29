import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useLogin from "@/hooks/useLogin";
import Logo from "../../public/logo/logo.png";
import LogoBlack from "../../public/logo/black-logo.png";
import LoginImg from "../../public/background/login-img.jpg";

import GlobalContext from "@/context/globalContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { data: loginData, error: loginError } = useLogin(username);
  const { fetchData, fetchUsers, fetchDataPreviousBill } =
    useContext(GlobalContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const submittedUsername = e.target.username.value;
    setUsername(submittedUsername);
  };

  useEffect(() => {
    if (loginData) {
      router.push("/home");
      fetchData();
      fetchUsers();
      fetchDataPreviousBill();
    }
  }, [loginData, router, fetchData]);

  return (
    /* <main className="flex items-center justify-center min-h-screen bg-[#1b1b1b]/90 backdrop-blur-sm text-white">
      <section className="mb-8 border-b-white/20 p-6 shadow-lg w-full max-w-md rounded-lg bg-[#2b2b2b]/50">
        <header className="space-y-6">
          <img src={Logo.src} alt="Logo" className="h-6" />
          <p className="space-y-2 text-white/40 font-thin">
            Welcome to Expense Tracker - about duit akan habis!
          </p>
        </header>
        <form onSubmit={handleLogin} className="space-y-12">
          <div className="space-y-4">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
              className="text-white bg-transparent border border-white/20 w-full rounded-lg p-2 focus:outline-none focus:border-opacity-30 focus:bg-white/20"
            />
          </div>

          <button
            type="submit"
            className="bg-[#F7B267] text-black px-4 py-2 rounded-lg w-full font-semibold"
          >
            Login
          </button>
        </form>

        {loginError && (
          <footer className="mt-4 text-red-500">
            <p>Error logging in: {loginError}</p>
          </footer>
        )}

        {loginData && (
          <footer className="mt-4 text-green-500">
            <p>Login successful!</p>
          </footer>
        )}
      </section>
    </main> */

    <main className="grid grid-cols-5 min-h-screen ">
      <div className="col-span-3 flex justify-center h-screen items-center p-4 rounded-lg overflow-hidden relative">
        <img
          src={LoginImg.src}
          alt="Login Img"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src={LogoBlack.src}
          alt="Logo"
          className="h-8 absolute top-10 left-10"
        />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <a className="h-6 text-black text-2xl">
            <span className="text-red-700 font-semibold">Attention!</span> ,
            this software still beta and demo purpose only
          </a>
        </div>
      </div>
      <form
        onSubmit={handleLogin}
        className="col-span-2 py-4 items-center justify-center flex flex-col space-y-12"
      >
        <div className="items-center justify-center flex flex-col">
          <h1 className="text-4xl font-semibold">Welcome</h1>
          <h2 className="font-thin text-gray-300/80">
            welcome to Expense Tracker - about duit akan habis!
          </h2>
        </div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          required
          className="text-white bg-transparent border border-white/20 w-3/6 rounded-lg p-2 focus:outline-none focus:border-opacity-30 focus:bg-white/20"
        />
        <button
          type="submit"
          className="bg-[#F7B267] text-black px-4 py-2 rounded-lg w-3/6 font-semibold"
        >
          Login
        </button>
        {loginError && (
          <footer className="mt-4 text-red-500">
            <p>Error logging in: {loginError}</p>
          </footer>
        )}
        {loginData && (
          <footer className="mt-4 text-green-500">
            <p>Login successful!</p>
          </footer>
        )}
      </form>
    </main>
  );
}
