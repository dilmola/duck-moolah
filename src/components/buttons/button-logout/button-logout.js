// components/LogoutButton.js
import useLogout from "@/hooks/useLogout";
import LogoutIcon from "../../../../public/icons/icon-logout.png";

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <button onClick={handleLogout} className="bg-[#222222] hover:bg-[#2e2e2e] rounded-lg px-6 py-1">
      <div className="flex flex-row items-center space-x-2">
        <img src={LogoutIcon.src} alt="Logout Icon" className="h-4" />
        <a>logout</a>
      </div>
    </button>
  );
};

export default LogoutButton;
