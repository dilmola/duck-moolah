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
      <div className="px-8">
        <div className="flex items-center justify-between">
          <img
            src={Logo.src}
            alt="Logo"
            className="h-6 cursor-pointer" 
            onClick={handleLogoClick}
          />
          <div className="flex flex-row space-x-6 items-center">
            <h1>Welcome, {userName} !</h1>
            <ButtonLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
