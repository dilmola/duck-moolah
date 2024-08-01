import styles from "./card.module.css";
import ButtonContextMenu from "@/components/buttons/button-context-menu/button-context-menu";

const CardDetailItem = ({ card }) => {
  const dotStyle =
    card.typeAmount === "Fixed amount" ? styles.orangeDot : styles.yellowDot;

  return (
    <article className="p-4 border-b border-white/5 flex flex-row items-center justify-between">
      <div
        className={`w-2 h-2 rounded-full ${dotStyle} ${styles.pulse} mr-2`}
      ></div>
      <span className="flex-1">{card.typeAmount}</span>
      <section className="flex-1 font-bold">{card.nameOfBil}</section>
      <section className="flex-1 text-gray-500">{card.dueDateOfBill}</section>
      <section className="flex-1 font-semibold">{card.amountOfBill}</section>
      <footer className="flex-1">
        <button className="bg-[#A7C957]/20 border border-[#A7C957] text-[#A7C957] px-4 rounded-lg">
          Paid
        </button>
      </footer>
      <div className="flex items-center">
        <ButtonContextMenu />
      </div>
    </article>
  );
};

export default CardDetailItem;
