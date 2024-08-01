import AddIcon from "../../../../public/icons/icon-add.png";
import Image from "next/image";

const ButtonAdd = ({ onOpen }) => {
  return (
    <div>
      <button
        className="text-black bg-[#F7B267] px-6 py-2 rounded-lg font-semibold flex flex-row space-x-2 items-center"
        onClick={onOpen}
        aria-label="Add new card"
      >
        <Image src={AddIcon.src} height={16} width={16} alt="Add icon" />
        <span>Add Card</span>
      </button>
    </div>
  );
};

export default ButtonAdd;
