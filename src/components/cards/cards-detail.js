import styles from "./card.module.css";
import ButtonContextMenu from "@/components/buttons/button-context-menu/button-context-menu";

const CardDetailItem = ({ card }) => {
  const dotStyle =
    card.typeAmount === "Fixed amount" ? styles.orangeDot : styles.yellowDot;

  return (
    <article className="p-4 border-b border-white/5 flex flex-row items-center justify-between font-medium">
      <div
        className={`w-2 h-2 rounded-full ${dotStyle} ${styles.pulse} mr-2`}
      ></div>
      <span className="flex-1 font-thin text-white/60">
        {card.type_of_bill} bill
      </span>
      <section className="flex-1">{card.name_of_bill}</section>
      <section className="flex-1">{card.due_date}</section>
      <section className="flex-1">RM {card.bill_amount}</section>
      <footer className="flex-1">
        {card.status_bill && (
          <button
            className={`px-4 rounded-lg ${
              card.status_bill === "paid"
                ? "bg-[#A7C957]/20 border border-[#A7C957] text-[#A7C957]"
                : ""
            }`}
            disabled={card.status_bill === "paid"}
          >
            {card.status_bill === "paid" ? "Paid" : card.status_bill}
          </button>
        )}
      </footer>
      <div className="flex items-center">
        <ButtonContextMenu />
      </div>
    </article>
  );
};

export default CardDetailItem;
