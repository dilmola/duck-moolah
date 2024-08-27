import React, { useState, useContext, useRef, useEffect } from "react";
import Image from "next/image";
import moment from "moment-timezone";
import CloseIcon from "../../../../public/icons/icon-close.png";
import BackIcon from "../../../../public/icons/icon-back.png";
import addBillIcon from "../../../../public/icons/icon-addbill.png";
import GlobalContext from "@/context/globalContext";
import useFormNewBillValidation from "@/hooks/useFormNewBillValidation";
import useFormPrevBillValidation from "@/hooks/useFormPrevBillValidation";
import ModalAddNewMonth from "@/components/modals/modal-add/modal-add-new-month";
import ModalAddPreviousMonth from "@/components/modals/modal-add/modal-add-previous-month";

const initialFormValues = {
  name: "",
  billType: "",
  dueDate: null,
  amount: "",
};

const ModalAdd = () => {
  const [resetKey, setResetKey] = useState(0);
  const [activeTab, setActiveTab] = useState("ModalMenu");
  const [showContent, setShowContent] = useState(true);

  const {
    showModal,
    closeModal,
    createData,
    createDataBillPreviousMonth,
    loading,
  } = useContext(GlobalContext);

  const {
    newBillFormValues,
    newBillFormErrors,
    handleNewBillInputChange,
    handleNewBillDateChange,
    handleNewBillTypeChange,
    handleNewBillSubmit,
    resetNewBillFormValues,
  } = useFormNewBillValidation(initialFormValues);

  const {
    previousBillFormValues,
    previousBillFormErrors,
    handlePreviousBillInputChange,
    handlePreviousBillDateChange,
    handlePreviousBillSubmit,
    resetPreviousBillFormValues,
    setPreviousBillFormValues,
  } = useFormPrevBillValidation(initialFormValues);

  const handleNewBillFormSubmit = async () => {
    setResetKey((prevKey) => prevKey + 1);
    resetNewBillFormValues();
    closeModal();
    const formattedDueDate = newBillFormValues.dueDate
      ? moment(newBillFormValues.dueDate).format("YYYY-MM-DD")
      : null;

    console.log("Formatted Due Date:", formattedDueDate);
    try {
      const response = await createData({
        type_of_bill: newBillFormValues.billType,
        name_of_bill: newBillFormValues.name,
        due_date: newBillFormValues.dueDate
          ? moment(newBillFormValues.dueDate).format("YYYY-MM-DD")
          : null,
        bill_amount: newBillFormValues.amount,
        status_bill: "pending",
      });
      if (response.success) {
        console.log("Success on server");
      }
    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };

  const handlePreviousBillFormSubmit = async () => {
    setResetKey((prevKey) => prevKey + 1);
    resetPreviousBillFormValues();
    closeModal();
    const formattedDueDate = previousBillFormValues.dueDate
      ? moment(previousBillFormValues.dueDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        )
      : null;

    console.log("Formatted Due Date:", formattedDueDate);
    try {
      const response = await createDataBillPreviousMonth({
        name_of_bill: previousBillFormValues.name,
        due_date: previousBillFormValues.dueDate
          ? moment(previousBillFormValues.dueDate, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            )
          : null,
        bill_amount: previousBillFormValues.amount,
        status_bill: "pending",
        previous_month_id: previousBillFormValues.id,
        previous_month_id_exist: previousBillFormValues.previousmonthid,
        typeofbill: previousBillFormValues.typeofbill,
      });
      if (response.success) {
        console.log("Success on server");
      }
    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };

  const handleTabChange = (newTab) => {
    setShowContent(false);
    setTimeout(() => {
      setActiveTab(newTab);
      setShowContent(true);
    }, 300);
  };

  return (
    <div
      className={`fixed inset-12 flex justify-center items-center z-50 transition-all duration-100 transform ${
        showModal
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!showModal}
      aria-modal="true"
      role="dialog"
    >
      <div className="rounded-lg relative z-10 text-white max-w-screen-md bg-[#1b1b1b]/90 container backdrop-blur-sm">
        <header className="flex flex-row-reverse justify-between items-center border-b-2 border-b-white/20 p-6">
          <button
            className="cursor-pointer p-2 rounded-lg hover:rounded-3xl bg-black h-8 w-8"
            style={{ transition: "border-radius 0.3s ease-in-out" }}
            onClick={closeModal}
            aria-label="Close modal"
          >
            <Image
              src={CloseIcon.src}
              height={20}
              width={20}
              alt="Close icon"
            />
          </button>
          {(activeTab === "ModalAddNewMonth" ||
            activeTab === "ModalAddPreviousMonth") && (
            <button
              className="cursor-pointer p-2 rounded-lg hover:rounded-3xl bg-black h-8 w-8"
              style={{ transition: "border-radius 0.3s ease-in-out" }}
              onClick={() => handleTabChange("ModalMenu")}
              aria-label="Back to main"
            >
              <Image
                src={BackIcon.src}
                height={20}
                width={20}
                alt="Back icon"
              />
            </button>
          )}
        </header>
        <main className="p-6">
          <div className="flex flex-row space-x-4 items-center mb-12">
            <div className="relative w-4 h-4">
              <Image
                src={addBillIcon.src}
                layout="fill"
                alt="add bill"
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold">Add Bill Detail</h2>
          </div>
          {activeTab === "ModalMenu" && (
            <div
              id="tab-content1"
              role="tabpanel"
              className={`space-y-6 transition-opacity duration-300 ease-in transform ${
                showContent ? "opacity-100" : "opacity-0"
              }`}
            >
              <h4>Choose your bill</h4>
              <div className="space-y-2">
                <button
                  type="button"
                  className={`bg-transparent border border-white/60 text-white/60 px-4 py-2 rounded-lg w-full text-start hover:border-[#F7B267] hover:bg-[#F7B267]/20 hover:text-[#F7B267]`}
                  onClick={() => handleTabChange("ModalAddNewMonth")}
                >
                  Create new bill
                </button>
                <button
                  type="button"
                  className={`bg-transparent border border-white/60 text-white/60 px-4 py-2 rounded-lg w-full text-start hover:border-[#F7B267] hover:bg-[#F7B267]/20 hover:text-[#F7B267]`}
                  onClick={() => handleTabChange("ModalAddPreviousMonth")}
                >
                  Previous month bill
                </button>
              </div>
            </div>
          )}
          {activeTab === "ModalAddNewMonth" && (
            <ModalAddNewMonth
              newBillFormValues={newBillFormValues}
              newBillFormErrors={newBillFormErrors}
              handleNewBillInputChange={handleNewBillInputChange}
              handleNewBillDateChange={handleNewBillDateChange}
              handleNewBillTypeChange={handleNewBillTypeChange}
              handleNewBillSubmit={handleNewBillSubmit}
              handleNewBillFormSubmit={handleNewBillFormSubmit}
              resetKey={resetKey}
              loading={loading}
            />
          )}
          {activeTab === "ModalAddPreviousMonth" && (
            <ModalAddPreviousMonth
              previousBillFormValues={previousBillFormValues}
              previousBillFormErrors={previousBillFormErrors}
              handlePreviousBillInputChange={handlePreviousBillInputChange}
              handlePreviousBillDateChange={handlePreviousBillDateChange}
              handlePreviousBillSubmit={handlePreviousBillSubmit}
              handlePreviousBillFormSubmit={handlePreviousBillFormSubmit}
              setPreviousBillFormValues={setPreviousBillFormValues}
              resetKey={resetKey}
              loading={loading}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ModalAdd;
