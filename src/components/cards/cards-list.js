import { useState, useContext, useEffect } from "react";

import Card from "./card-large-item";
import CardDetail from "@/components/cards/cards-detail-item";
import GlobalContext from "@/context/globalContext";
import { SkeletonLoaderCard } from "@/components/loader/loader-skeleton-card";

const CardsList = () => {
  const { typeOfView, data: cards, error } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoaderCard />;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  const mapOfCards = cards.map((card, index) => {
    const cardProps = {
      typeAmount: card.type_of_bill,
      nameOfBill: card.name_of_bill,
      dueDateOfBill: card.due_date,
      amountOfBill: card.bill_amount,
      statusOfBill: card.status_bill,
      idOfBill: card.id,
    };

    return typeOfView === "cardsLargeItem" ? (
      <Card key={index} {...cardProps} />
    ) : (
      <CardDetail key={index} {...cardProps} />
    );
  });

  return (
    <>
      <div
        className={`transition-opacity duration-300 ease-in  ${
          typeOfView === "cardsLargeItem"
            ? "opacity-100 "
            : "opacity-0 pointer-events-none"
        } ${typeOfView === "cardsLargeItem" ? "grid grid-cols-3 gap-6" : ""}`}
      >
        {typeOfView === "cardsLargeItem" && mapOfCards}
      </div>

      <div
        className={`transition-opacity duration-300 ease-in  ${
          typeOfView === "cardsDetailItem"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        } ${
          typeOfView === "cardsDetailItem"
            ? "rounded-lg border border-white/10"
            : ""
        }`}
      >
        {typeOfView === "cardsDetailItem" && mapOfCards}
      </div>

      <div
        className={`transition-opacity duration-300 ease-in  ${
          typeOfView === "" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {typeOfView === "" && "No view type selected"}
      </div>
    </>
  );
};

export default CardsList;
