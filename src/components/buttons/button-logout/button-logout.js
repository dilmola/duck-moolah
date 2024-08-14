// components/LogoutButton.js
import useLogout from "@/hooks/useLogout";
import LogoutIcon from "../../../../public/icons/icon-logout.png";

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <button onClick={handleLogout}>
      <div className="flex flex-row items-center space-x-2">
        <img src={LogoutIcon.src} alt="Logout Icon" className="h-4" />
        <a>Logout</a>
      </div>
    </button>
  );
};

export default LogoutButton;
