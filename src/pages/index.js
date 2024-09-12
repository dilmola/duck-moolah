import { useState, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import useLogin from "@/hooks/useLogin";
import LogoBlack from "../../public/logo/black-logo.png";
import LogoMobileBlack from "../../public/logo/logo-mobile-black.png";
import LoginImg from "../../public/background/login-img.jpg";

import GlobalContext from "@/context/globalContext";
import InstructionModal from "@/components/modals/modal-instruction";

export default function Login() {
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();
  const { data: loginData, error: loginError } = useLogin(username);
  const { fetchData, fetchUsers, fetchDataPreviousBill } =
    useContext(GlobalContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const submittedUsername = e.target.username.value;
    setUsername(submittedUsername);
  };

  const memoizedFetchData = useCallback(fetchData, []);
  const memoizedFetchUsers = useCallback(fetchUsers, []);
  const memoizedFetchDataPreviousBill = useCallback(fetchDataPreviousBill, []);

  useEffect(() => {
    if (loginData) {
      router.push("/home");
      memoizedFetchData();
      memoizedFetchUsers();
      memoizedFetchDataPreviousBill();
    }
  }, [
    loginData,
    router,
    memoizedFetchData,
    memoizedFetchUsers,
    memoizedFetchDataPreviousBill,
  ]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-5 min-h-screen">
      <div className="md:col-span-3 flex justify-center md:h-screen h-4/5 items-center p-4 rounded-lg overflow-hidden relative">
        <img
          src={LoginImg.src}
          alt="Login Img"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src={LogoBlack.src}
          alt="Logo"
          className="h-8 absolute top-10 left-10 md:block hidden"
        />
        <img
          src={LogoMobileBlack.src}
          alt="Logo Mobile Black"
          className="h-8 absolute top-10 left-10 md:hidden block"
        />
      </div>
      <div className="flex flex-col md:min-h-screen h-max col-span-2 md:p-12 p-12">
        <div className="flex-grow flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="py-4 items-center justify-center flex flex-col space-y-12 min-w-80"
          >
            <div className="items-center justify-center flex flex-col">
              <h1 className="text-4xl font-semibold">welcome</h1>
              <h2 className="font-thin text-gray-300/80 text-center">
                to expense and bills tracker
              </h2>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
              className="text-white bg-transparent border border-white/20 grow w-full rounded-lg p-2 focus:outline-none focus:border-opacity-30 focus:bg-white/20"
            />
            <button
              type="submit"
              className="bg-[#F7B267] text-black px-4 py-2 rounded-lg w-full font-semibold"
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
        </div>
        <footer className="text-white text-center">
          <p>design by aidil maula</p>
        </footer>
      </div>
      <InstructionModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        title="Important Information"
      />
    </main>
  );
}
