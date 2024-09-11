import styles from "./card.module.css";
import ButtonContextMenu from "@/components/buttons/button-context-menu/button-context-menu";

const CardDetailItem = ({
  idOfBill,
  typeAmount,
  nameOfBill,
  dateBillCreated,
  dueDateOfBill,
  amountOfBill,
  statusOfBill,
}) => {
  const dotStyle = typeAmount === "fixed" ? styles.orangeDot : styles.yellowDot;

  return (
    <article className="p-4 border-b border-white/5 flex flex-row items-center justify-between font-medium">
      <div
        className={`w-2 h-2 rounded-full ${dotStyle} ${styles.pulse} mr-2`}
      ></div>
      <section className="flex-1">{nameOfBill}</section>

      <div className="md:flex-1 md:flex md:flex-row">
        <div className="flex-1 pointer-events-none no-underline">
          {dueDateOfBill}
        </div>
        <div className="flex-1 pointer-events-none">RM {amountOfBill}</div>
      </div>
      <footer className="relative flex-1">
        {statusOfBill !== "pending" && (
          <div className="absolute inset-0 flex items-center justify-center">
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
          </div>
        )}
      </footer>
      <div className="flex items-center">
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
    </article>
  );
};

export default CardDetailItem;
