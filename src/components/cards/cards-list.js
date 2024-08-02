import { useState, useContext, useEffect } from "react";

import Card from "./card";
import CardDetail from "@/components/cards/cards-detail";
import ViewContext from "@/context/viewContext";
import { SkeletonLoader } from "@/components/loader/loader-skeleton";

const CardsList = ({ cards }) => {
  const { typeOfView } = useContext(ViewContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      {typeOfView === "cardsLarge" ? (
        <div className="grid grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              typeAmount={card.type_of_bill}
              nameOfBil={card.name_of_bill}
              dueDateOfBill={card.due_date}
              amountOfBill={card.bill_amount}
              statusOfBill={card.status_bill}
            />
          ))}
        </div>
      ) : typeOfView === "cardsDetail" ? (
        <div className="rounded-lg border border-white/10">
          {cards.map((card, index) => (
            <CardDetail key={index} card={card} />
          ))}
        </div>
      ) : (
        <div>No view type selected</div>
      )}
    </>
  );
};

export default CardsList;
