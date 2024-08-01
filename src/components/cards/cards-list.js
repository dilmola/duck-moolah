import { useState, useContext, useEffect } from "react";

import Card from "./card";
import CardDetail from "@/components/cards/cards-detail";
import ViewContext from "@/context/viewContext";
import { SkeletonLoader } from "@/components/loader/loader-skeleton";

const CardsList = ({ cards }) => {
  const { typeOfView } = useContext(ViewContext);

  // Optional: Manage local loading state if needed
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state if you fetch data or do additional processing
    const timer = setTimeout(() => {
      setIsLoading(false); // Set to false after simulating loading
    }, 1000); // Adjust the timeout as needed

    return () => clearTimeout(timer); // Cleanup timeout on unmount
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
              typeAmount={card.typeAmount}
              nameOfBil={card.nameOfBil}
              dueDateOfBill={card.dueDateOfBill}
              amountOfBill={card.amountOfBill}
            />
          ))}
        </div>
      ) : typeOfView === "cardsDetail" ? (
        <div className="rounded-lg overflow-hidden border border-white/10">
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
