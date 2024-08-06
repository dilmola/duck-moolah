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
      {typeOfView === "cardsLargeItem" ? (
        <div className="grid grid-cols-3 gap-6">{mapOfCards}</div>
      ) : typeOfView === "cardsDetailItem" ? (
        <div className="rounded-lg border border-white/10">{mapOfCards}</div>
      ) : (
        <div>No view type selected</div>
      )}
    </>
  );
};

export default CardsList;
