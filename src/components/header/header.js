import Logo from "../../../public/logo/logo.png";
import ButtonLogout from "@/components/buttons/button-logout/button-logout";

function Header({ userName }) {
  return (
    <div className="bg-[#0a0a0a] w-full py-4 mx-auto rounded-lg shadow-md">
      <div className="px-12">
        <div className="flex items-center justify-between">
          <img src={Logo.src} alt="Logo" className="h-6" />
          <div className="flex flex-row space-x-6">
            <h1>Welcome, {userName}!</h1> <div>|</div>
            <ButtonLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
