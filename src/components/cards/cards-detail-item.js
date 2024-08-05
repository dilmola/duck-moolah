import styles from "./card.module.css";
import ButtonContextMenu from "@/components/buttons/button-context-menu/button-context-menu";

const CardDetailItem = ({
  idOfBill,
  typeAmount,
  nameOfBill,
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
      <span className="flex-1 font-thin text-white/60">{typeAmount} bill</span>
      <section className="flex-1">{nameOfBill}</section>
      <section className="flex-1">{dueDateOfBill}</section>
      <section className="flex-1">RM {amountOfBill}</section>
      <footer className="flex-1">
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
      </footer>
      <div className="flex items-center">
        <ButtonContextMenu
          statusOfBill={statusOfBill}
          idOfBill={idOfBill}
          typeAmount={typeAmount}
          nameOfBill={nameOfBill}
          dueDateOfBill={dueDateOfBill}
          amountOfBill={amountOfBill}
        />
      </div>
    </article>
  );
};

export default CardDetailItem;
