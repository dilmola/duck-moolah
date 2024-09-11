import Logo from "../../../public/logo/logo.png";
import ButtonLogout from "@/components/buttons/button-logout/button-logout";
import { useRouter } from "next/router";

function Header({ userName }) {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/home");
  };

  return (
    <div className="bg-[#0a0a0a] w-full py-4 mx-auto rounded-lg shadow-md">
      <div className="px-4 md:px-8">
        <div className="flex md:items-center md:justify-between md:flex-row flex-col md:space-y-0 space-y-4">
          <img
            src={Logo.src}
            alt="Logo"
            className="h-6 cursor-pointer object-contain" 
            onClick={handleLogoClick}
          />
          <div className="flex md:flex-row justify-between space-x-6 items-center">
            <h1>Welcome, {userName} !</h1>
            <ButtonLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
