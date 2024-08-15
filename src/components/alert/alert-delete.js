import GlobalContext from "@/context/globalContext";
import { useState, useContext } from "react";

const AlertDelete = ({ isOpen, onConfirm, onCancel, idOfBill }) => {
  const { deleteBill, closeModal } = useContext(GlobalContext);

  if (!isOpen) return null;

  const handleDeleteClick = async () => {
    if (!idOfBill) {
      console.warn("No billId provided.");
      return;
    }

    try {
      await deleteBill(idOfBill);
      onConfirm();
      closeModal();
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1B1B1B] rounded-lg p-6 max-w-screen-sm">
        <h2 className="text-xl font-semibold mb-2">
          You are about to delete a bill
        </h2>
        <p className="mb-12 text-white/60 font-thin">
          Are you sure you want to delete a bill? This action cannot be undone
        </p>
        <div className="flex flex-row space-x-2">
          <div className="flex-1">
            <button
              onClick={onCancel}
              className="bg-transparent border border-white/60 text-white/60 px-4 py-2 rounded-lg w-full"
            >
              Cancel
            </button>
          </div>
          <div className="flex-1">
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDelete;
