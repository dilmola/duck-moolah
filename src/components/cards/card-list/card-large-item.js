import ButtonContextMenu from "@/components/buttons/button-context-menu/button-context-menu";
import styles from "./card.module.css";

const CardLargeItem = ({
  idOfBill,
  typeAmount,
  nameOfBill,
  dueDateOfBill,
  dateBillCreated,
  amountOfBill,
  statusOfBill,
}) => {
  const dotStyle = typeAmount === "fixed" ? styles.orangeDot : styles.yellowDot;

  return (
    <div className="rounded-lg p-6 border border-white/10">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <div className="flex flex-row items-center">
            <div
              className={`w-2 h-2 rounded-full ${dotStyle} ${styles.pulse} mr-2`}
            ></div>
            <div className="font-thin text-white/60">{typeAmount} bill</div>
          </div>
          <ButtonContextMenu
            statusOfBill={statusOfBill}
            idOfBill={idOfBill}
            typeAmount={typeAmount}
            nameOfBill={nameOfBill}
            dateBillCreated={dateBillCreated}
            dueDateOfBill={dueDateOfBill}
            amountOfBill={amountOfBill}
          />
        </div>
        <div className="text-2xl md:mb-16 mb-8">{nameOfBill}</div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <a>
              <span className="font-thin text-white/60">Due date: </span>
              {dueDateOfBill}
            </a>
            <a>
              <span className="font-thin text-white/60">Bill amount: </span>
              RM {amountOfBill}
            </a>
          </div>
          <div>
            {statusOfBill !== "pending" && (
              <button
                className={`px-4 rounded-lg ${
                  statusOfBill === "paid"
                    ? "bg-[#A7C957]/20 border border-[#A7C957] text-[#A7C957]"
                    : ""
                }`}
                disabled={statusOfBill === "paid"}
              >
                {statusOfBill === "paid" ? "Paid" : statusOfBill}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLargeItem;
