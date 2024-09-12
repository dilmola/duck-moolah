import FieldDatePicker from "@/components/field/field-datepicker";
import React, { useState, useRef, useEffect, useContext } from "react";
import moment from "moment-timezone";
import GlobalContext from "@/context/globalContext";

const ModalAddPreviousMonth = ({
  previousBillFormValues,
  previousBillFormErrors,
  handlePreviousBillInputChange,
  handlePreviousBillDateChange,
  handlePreviousBillSubmit,
  handlePreviousBillFormSubmit,
  setPreviousBillFormValues,
  resetKey,
  loading,
}) => {
  const { previousdata: previousdata } = useContext(GlobalContext);

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [displayedData, setDisplayedData] = useState(previousdata);

  const handleCategorySelect = (
    category,
    dueDate,
    name,
    id,
    typeofbill,
    previousmonthid
  ) => {
    const dueDatePlusOneMonth = dueDate
      ? moment(dueDate, "YYYY-MM-DD").add(1, "month").format("DD/MM/YYYY")
      : null;

    setPreviousBillFormValues((prevValues) => ({
      ...prevValues,
      category,
      dueDate: dueDatePlusOneMonth,
      name,
      id,
      typeofbill,
      previousmonthid,
    }));

    const newValues = {
      category,
      dueDate: dueDatePlusOneMonth,
      name,
      id,
      typeofbill,
      previousmonthid,
    };

    setPreviousBillFormValues(newValues);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="tab-content2b"
      role="tabpanel"
      className={`space-y-8 transition-opacity duration-300 ease-in transform opacity-100`}
    >
      <form
        className="md:space-y-4 space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          handlePreviousBillSubmit(handlePreviousBillFormSubmit);
        }}
      >
        <div className="space-y-2">
          <label htmlFor="bill-category" className="text-white/60">
            Previous month bill
          </label>
          <div className="relative">
            <div
              className="focus:bg-white/20 bg-transparent border border-white/20 w-full rounded-lg py-2 px-4 cursor-pointer focus:outline-none focus:border-opacity-30"
              onClick={() => setIsOpen(!isOpen)}
            >
              {previousBillFormValues.category || "Select a category"}
            </div>

            {isOpen && (
              <ul
                id="bill-category"
                className="absolute bg-[#282828] w-full rounded-lg mt-2 p-2 focus:outline-none focus:border-opacity-30 z-10 max-h-48 overflow-y-auto"
                ref={dropdownRef}
              >
                {displayedData.map((data, index) => (
                  <li
                    key={index}
                    className="py-1 px-2 cursor-pointer hover:bg-[#383838] rounded-md"
                    onClick={() =>
                      handleCategorySelect(
                        data.name_of_bill,
                        data.due_date,
                        data.name_of_bill,
                        data.id,
                        data.type_of_bill,
                        data.previous_month_id
                      )
                    }
                  >
                    {data.name_of_bill}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {previousBillFormErrors.category && (
            <p className="text-red-500 text-sm">
              {previousBillFormErrors.category}
            </p>
          )}
        </div>
        <div className="space-y-2">
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
              value={previousBillFormValues.amount}
              onChange={handlePreviousBillInputChange}
            />
            {previousBillFormErrors.amount && (
              <p className="text-red-500 text-sm">
                {previousBillFormErrors.amount}
              </p>
            )}
            <p id="bill-amount-helper" className="sr-only">
              Enter the amount of the bill
            </p>
          </div>
        </div>
        <div className="flex md:flex-row md:space-x-2 flex-col space-y-4 md:space-y-0">
          <div className="space-y-2 flex flex-col flex-1">
            <label htmlFor="due-date" className="text-white/60">
              Due Date
            </label>
            <div>
              <FieldDatePicker
                id="due-date"
                resetKey={resetKey}
                selectedDate={
                  previousBillFormValues.dueDate
                    ? moment(
                        previousBillFormValues.dueDate,
                        "DD/MM/YYYY"
                      ).toDate()
                    : null
                }
                onChange={handlePreviousBillDateChange}
              />
            </div>
            {previousBillFormErrors.dueDate && (
              <p className="text-red-500 text-sm">
                {previousBillFormErrors.dueDate}
              </p>
            )}
          </div>
          <div className="space-y-2 flex flex-col flex-1">
            <label htmlFor="bill-name" className="text-white/60">
              Name of Bill
            </label>
            <input
              id="bill-name"
              type="text"
              name="name"
              className="pointer-events-none text-white bg-transparent border border-white/20 w-full rounded-lg p-2 focus:outline-none focus:border-opacity-30"
              aria-describedby="bill-name-helper"
              value={previousBillFormValues.name}
              readOnly
            />
            {previousBillFormErrors.name && (
              <p className="text-red-500 text-sm">
                {previousBillFormErrors.name}
              </p>
            )}
            <p id="bill-name-helper" className="sr-only">
              Enter the name of the bill
            </p>
          </div>
        </div>
        <button
          onClick={handlePreviousBillSubmit(handlePreviousBillFormSubmit)}
          className="bg-[#F7B267] text-black px-4 py-2 rounded-lg w-full"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ModalAddPreviousMonth;
