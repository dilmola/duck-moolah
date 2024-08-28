import { useState, useContext, useEffect } from "react";

import CardLargeItem from "./card-large-item";
import CardDetailItem from "@/components/cards/card-list/cards-detail-item";
import GlobalContext from "@/context/globalContext";
import { SkeletonLoaderCard } from "@/components/loader/loader-skeleton-card";

const CardsList = () => {
  const {
    typeOfView,
    data: cards,
    filteredData,
    error,
    loading,
  } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedData, setDisplayedData] = useState(cards);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setDisplayedData(filteredData.length ? filteredData : cards);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setDisplayedData(filteredData.length ? filteredData : cards);
      setIsLoading(false);
    }
  }, [loading, filteredData, cards]);

  if (isLoading) {
    return <SkeletonLoaderCard />;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  const noResults = !displayedData.length && !loading;

  const mapOfCards = displayedData.map((card, index) => {
    const cardProps = {
      typeAmount: card.type_of_bill,
      nameOfBill: card.name_of_bill,
      dateBillCreated: card.date_bill_created,
      dueDateOfBill: card.due_date,
      amountOfBill: card.bill_amount,
      statusOfBill: card.status_bill,
      idOfBill: card.id,
    };

    return typeOfView === "cardsLargeItem" ? (
      <CardLargeItem key={index} {...cardProps} />
    ) : (
      <CardDetailItem key={index} {...cardProps} />
    );
  });

  return (
    <>
      {noResults ? (
        <div className="text-center text-gray-500 py-4">No results found</div>
      ) : (
        <>
          <div
            className={`transition-opacity duration-300 ease-in ${
              typeOfView === "cardsLargeItem"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            } ${
              typeOfView === "cardsLargeItem" ? "grid grid-cols-3 gap-6" : ""
            }`}
          >
            {typeOfView === "cardsLargeItem" && mapOfCards}
          </div>

          <div
            className={`transition-opacity duration-300 ease-in ${
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
            className={`transition-opacity duration-300 ease-in ${
              typeOfView === ""
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {typeOfView === "" && "No view type selected"}
          </div>
        </>
      )}
    </>
  );
};

export default CardsList;
