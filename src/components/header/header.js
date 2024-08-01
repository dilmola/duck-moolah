import Logo from "../../../public/logo/logo.png";

const Header = () => {
  return (
    <div className="bg-[#0a0a0a] w-full py-4 mx-auto rounded-lg shadow-md">
      <div className="flex justify-start items-center px-12">
        <div className="flex items-center">
          <img src={Logo.src} alt="Logo" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default Header;
