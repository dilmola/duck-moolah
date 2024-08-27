import FieldDatePicker from "@/components/field/field-datepicker";
import moment from "moment-timezone";

const ModalAddNewMonth = ({
  newBillFormValues,
  newBillFormErrors,
  handleNewBillInputChange,
  handleNewBillDateChange,
  handleNewBillTypeChange,
  handleNewBillSubmit,
  handleNewBillFormSubmit,
  resetKey,
  loading,
}) => {
  return (
    <div
      id="tab-content2a"
      role="tabpanel"
      className={`space-y-8 transition-opacity duration-300 ease-in transform opacity-100`}
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleNewBillSubmit(handleNewBillFormSubmit);
        }}
      >
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
            value={newBillFormValues.name}
            onChange={handleNewBillInputChange}
          />
          {newBillFormErrors.name && (
            <p className="text-red-500 text-sm">{newBillFormErrors.name}</p>
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
                onClick={() => handleNewBillTypeChange("dynamic")}
                className={`${
                  newBillFormValues.billType === "dynamic"
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
                onClick={() => handleNewBillTypeChange("fixed")}
                className={`${
                  newBillFormValues.billType === "fixed"
                    ? "bg-[#F7B267]/20 border border-[#F7B267] text-[#F7B267]"
                    : "bg-transparent border border-white/60 text-white/60"
                } px-4 py-2 rounded-lg w-full`}
              >
                Fixed Amount
              </button>
            </div>
          </div>
          {newBillFormErrors.billType && (
            <p className="text-red-500 text-sm">{newBillFormErrors.billType}</p>
          )}
        </fieldset>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="space-y-2 flex flex-col flex-1">
            <label htmlFor="due-date" className="text-white/60">
              Due Date
            </label>
            <FieldDatePicker
              id="due-date"
              onChange={handleNewBillDateChange}
              resetKey={resetKey}
              selectedDate={
                newBillFormValues.dueDate
                  ? moment(newBillFormValues.dueDate, "DD/MM/YYYY").toDate()
                  : null
              }
            />
            {newBillFormErrors.dueDate && (
              <p className="text-red-500 text-sm">
                {newBillFormErrors.dueDate}
              </p>
            )}
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
                value={newBillFormValues.amount}
                onChange={handleNewBillInputChange}
              />
              {newBillFormErrors.amount && (
                <p className="text-red-500 text-sm">
                  {newBillFormErrors.amount}
                </p>
              )}
              <p id="bill-amount-helper" className="sr-only">
                Enter the amount of the bill
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleNewBillSubmit(handleNewBillFormSubmit)}
          className="bg-[#F7B267] text-black px-4 py-2 rounded-lg w-full"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ModalAddNewMonth;
