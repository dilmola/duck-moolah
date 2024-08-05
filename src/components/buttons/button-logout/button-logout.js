// components/LogoutButton.js
import useLogout from '@/hooks/useLogout';

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <button onClick={handleLogout} className='bg-red'>
      Logout
    </button>
  );
};

export default LogoutButton;
