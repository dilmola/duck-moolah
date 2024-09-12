import Image from "next/image";
import CloseIcon from "../../../public/icons/icon-close.png";

export default function ModalInstruction({ showModal, onClose, title }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1b1b1b]/90 rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="cursor-pointer p-2 rounded-lg hover:rounded-3xl bg-black/20 h-8 w-8"
            style={{ transition: "border-radius 0.3s ease-in-out" }}
            onClick={onClose}
            aria-label="Close modal"
          >
            <Image
              src={CloseIcon.src}
              height={20}
              width={20}
              alt="Close icon"
            />
          </button>
        </div>
        <div>
          <p>
            Attention! This system is still in beta and has been developed
            primarily for family use. If you would like to try it out, you can
            log in as
            <span className="font-semibold text-[#F7B267]"> userdemo</span>
          </p>
        </div>
      </div>
    </div>
  );
}
