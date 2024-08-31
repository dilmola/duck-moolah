import { useState, useEffect, useContext } from "react";
import GlobalContext from "@/context/globalContext";
import { SkeletonLoaderAmount } from "@/components/loader/loader-skeleton-amount";

export function useAmount() {
  const { data: amountbill } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoaderAmount />;
  }

  if (!Array.isArray(amountbill)) {
    console.error("amountbill is not an array or is not defined");
    return 0;
  }

  const totalAmount = amountbill.reduce(
    (total, bill) => total + bill.bill_amount,
    0
  );

  return `RM ${totalAmount.toFixed(2)}`;
}
