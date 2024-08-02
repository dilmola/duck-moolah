import ButtonContextMenu from "@/components/buttons/button-context-menu/button-context-menu";
import styles from "./card.module.css";

const Card = ({
  typeAmount,
  nameOfBil,
  dueDateOfBill,
  amountOfBill,
  statusOfBill,
}) => {
  const dotStyle =
    typeAmount === "Fixed amount" ? styles.orangeDot : styles.yellowDot;

  return (
    <>
      <div className="rounded-lg p-6 border border-white/10">
        <div className="flex flex-col">
          <div className="flex justify-between mb-4">
            <div className="flex flex-row items-center">
              <div
                className={`w-2 h-2 rounded-full ${dotStyle} ${styles.pulse} mr-2`}
              ></div>
              <div className="font-thin text-white/60">{typeAmount} bill</div>
            </div>
            <ButtonContextMenu />
          </div>
          <div className="text-2xl mb-16">{nameOfBil}</div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
