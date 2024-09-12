import Logo from "../../../public/logo/logo.png";
import MobileLogo from "../../../public/logo/logo-mobile.png";
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
        <div className="flex items-center justify-between flex-row">
          <img
            src={MobileLogo.src}
            alt="Mobile Logo"
            className="h-6 cursor-pointer object-contain md:hidden block"
            onClick={handleLogoClick}
          />
          <img
            src={Logo.src}
            alt="Logo"
            className="h-6 cursor-pointer object-contain md:block hidden"
            onClick={handleLogoClick}
          />
          <div className="flex md:flex-row justify-between space-x-6 items-center">
            <h1 className="md:block hidden">Welcome, {userName} !</h1>
            <ButtonLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
