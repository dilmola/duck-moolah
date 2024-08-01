import DownloadIcon from "../../../../public/icons/icon-download.png";
import Image from "next/image";

const ButtonDownload = () => {
  return (
    <div>
    <button
      className="text-[#F7B267] border border-[#F7B267] px-6 py-2 rounded-lg font-semibold flex flex-row space-x-2 items-center"
      aria-label="Download data"
    >
      <Image src={DownloadIcon.src} height={16} width={16} alt="Download icon" />
      <span>Download</span>
    </button>
  </div>
  );
};

export default ButtonDownload;
