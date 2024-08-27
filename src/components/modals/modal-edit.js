import React, { useState, useEffect, useContext } from "react";
import CloseIcon from "../../../public/icons/icon-close.png";
import editBillIcon from "../../../public/icons/icon-edit.png";
import FieldDatePicker from "@/components/field/field-datepicker";
import Image from "next/image";
import useFormBillEditValidation from "@/hooks/useFormEditBillValidation";
import moment from "moment-timezone";
import GlobalContext from "@/context/globalContext";

const initialFormValues = {
  name: "",
  billType: "",
  dueDate: null,
  amount: "",
};

const ModalEdit = ({
  showModal,
  onClose,
  idOfBill,
  typeAmount,
  nameOfBill,
  dueDateOfBill,
  amountOfBill,
}) => {
  const [resetKey, setResetKey] = useState(0);
  const { updateBill, setLoading } = useContext(GlobalContext);

  const {
    values,
    errors,
    handleChange,
    handleDateChange,
    handleBillTypeChange,
    handleSubmit,
    resetValues,
    setValues,
  } = useFormBillEditValidation(initialFormValues);

  useEffect(() => {
    if (showModal) {
      setValues({
        name: nameOfBill || "",
        billType: typeAmount || "",
        dueDate: dueDateOfBill
          ? moment(dueDateOfBill, "YYYY-MM-DD").format("DD/MM/YYYY")
          : "",
        amount: amountOfBill || "",
      });
    }
  }, [showModal, dueDateOfBill]);

  const handleFormSubmit = async () => {
    setResetKey((prevKey) => prevKey + 1);
    onClose();

    try {
      const billProps = {
        type_of_bill: values.billType,
        name_of_bill: values.name,
        due_date: values.dueDate
          ? moment(values.dueDate, "DD/MM/YYYY").format("YYYY-MM-DD")
          : null,
        bill_amount: values.amount,
      };

      if (!idOfBill || !billProps) {
        console.error("Invalid idOfBill or billProps");
        return;
      }
      const response = await updateBill(idOfBill, billProps);

      if (response) {
        resetValues();
      }
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50  transition-all duration-100 transform ${
        showModal ? "" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!showModal}
      aria-modal="true"
      role="dialog"
    >
      <div className="rounded-lg relative z-10 text-white max-w-screen-md bg-[#1b1b1b]/90 container backdrop-blur-sm">
        <header className="flex flex-row justify-between items-center mb-8 border-b-2 border-b-white/20 p-6">
          <div className="flex flex-row space-x-4 items-center">
            <div className="relative w-4 h-4">
              <Image
                src={editBillIcon.src}
                layout="fill"
                alt="edit bill"
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold">Edit Bill Detail</h2>
          </div>
          <button
            className="cursor-pointer p-2 rounded-lg hover:rounded-3xl bg-black h-8 w-8"
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
        </header>
        <main className="p-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="bill-name" className="text-white/60">
                Name of Bill
              </label>
              <input
                id="bill-name"
                type="text"
                name="name"
                className="focus:bg-white/20 text-white bg-transparent border border-white/20 w-full rounded-lg p-2 focus:outline-none focus:border-opacity-30"
                aria-describedby="bill-name-helper"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
              <p id="bill-name-helper" className="sr-only">
                Enter the name of the bill
              </p>
            </div>
            <fieldset className="space-y-2">
              <legend className="text-white/60">Type of Bill</legend>
              <div className="flex flex-row space-x-2">
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => handleBillTypeChange("dynamic")}
                    className={`${
                      values.billType === "dynamic"
                        ? "bg-[#F7B267]/20 border border-[#F7B267] text-[#F7B267]"
                        : "bg-transparent border border-white/60 text-white/60"
                    } px-4 py-2 rounded-lg w-full`}
                  >
                    Dynamic Amount
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => handleBillTypeChange("fixed")}
                    className={`${
                      values.billType === "fixed"
                        ? "bg-[#F7B267]/20 border border-[#F7B267] text-[#F7B267]"
                        : "bg-transparent border border-white/60 text-white/60"
                    } px-4 py-2 rounded-lg w-full`}
                  >
                    Fixed Amount
                  </button>
                </div>
              </div>
              {errors.billType && (
                <p className="text-red-500 text-sm">{errors.billType}</p>
              )}
            </fieldset>
            <div className="flex flex-row space-x-2">
              <div className="space-y-2 flex flex-col flex-1">
                <label htmlFor="due-date" className="text-white/60">
                  Due Date
                </label>
                <div>
                  <FieldDatePicker
                    key={resetKey}
                    id="due-date"
                    onChange={handleDateChange}
                    resetKey={resetKey}
                    selectedDate={
                      values.dueDate
                        ? moment(values.dueDate, "DD/MM/YYYY").toDate()
                        : null
                    }
                  />
                  {errors.dueDate && (
                    <p className="text-red-500 text-sm">{errors.dueDate}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 flex flex-col flex-1">
                <label htmlFor="bill-amount" className="text-white/60">
                  Bill Amount
                </label>
                <div>
                  <input
                    id="bill-amount"
                    type="text"
                    name="amount"
                    className="focus:bg-white/20 text-white bg-transparent border border-white/20 w-full rounded-lg p-2 focus:outline-none focus:border-opacity-30"
                    aria-describedby="bill-amount-helper"
                    value={values.amount}
                    onChange={handleChange}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-sm">{errors.amount}</p>
                  )}
                  <p id="bill-amount-helper" className="sr-only">
                    Enter the amount of the bill
                  </p>
                </div>
              </div>
            </div>
          </form>
        </main>
        <footer className="border-t-2 border-t-white/20 p-6 mt-8">
          <button
            onClick={handleSubmit(handleFormSubmit)}
            className="bg-[#F7B267] text-black px-4 py-2 rounded-lg w-full"
          >
            {setLoading ? "Updating..." : "Update"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalEdit;
