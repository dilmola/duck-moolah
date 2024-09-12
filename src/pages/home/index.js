import { useContext, useEffect, useState } from "react";
import Header from "@/components/header/header";
import Search from "@/components/search/search";
import ButtonView from "@/components/buttons/button-view/button-view";
import ButtonSort from "@/components/buttons/button-sort/button-sort";
import ButtonDownload from "@/components/buttons/button-download/button-download";
import ButtonAdd from "@/components/buttons/button-add/button-add";
import CardsList from "@/components/cards/card-list/cards-list";
import ModalAdd from "@/components/modals/modal-add/modal-add";
import GlobalContext from "@/context/globalContext";
import { useAmount } from "@/hooks/useAmount";
import { useCurrentMonthYear } from "@/hooks/useCurrentMonthYear";
import CardSummary from "@/components/cards/card-summary/card-summary";
import AmountImg from "../../../public/icons/icon-amount.png";
import StatusPaidImg from "../../../public/icons/icon-statuspaid.png";

export default function Home() {
  const {
    typeOfView,
    setTypeOfView,
    closeModal,
    openModal,
    showModal,
    formattedDate,
    userdata: UserNameData,
    data: setAllData,
  } = useContext(GlobalContext);

  const totalAmount = useAmount();
  const currentMonth = useCurrentMonthYear();
  const userName =
    UserNameData && UserNameData.length > 0
      ? UserNameData[0].user_name
      : "No User";

  const [paidBillsCount, setPaidBillsCount] = useState(0);

  useEffect(() => {
    if (setAllData) {
      const paidBills = setAllData.filter(
        (bill) => bill.status_bill === "paid"
      );
      setPaidBillsCount(paidBills.length);
    }
  }, [setAllData]);

  return (
    <main className="min-h-screen bg-gradient pt-12 pb-40">
      <div className="container mx-auto flex flex-col md:space-y-20 space-y-12 md:px-28 px-4">
        <Header userName={userName} />
        <section className="mt-12 space-y-4">
          <h2 className="md:text-5xl text-4xl font-semibold">
            Keep Track of Your Bills Here
          </h2>
          <h3 className="md:text-2xl text-xl font-thin text-white/20">
            manage all your expenses and bills in One-stop platform. Everything
            you need to stay on top of your finances is right here, in one place
          </h3>
          <div className="flex flex-row w-full gap-2">
            <Search />
            <div className="border border-white/10 rounded-lg flex flex-row">
              <ButtonView
                typeOfView={typeOfView}
                setTypeOfView={setTypeOfView}
              />
              <ButtonSort />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <ButtonDownload />
            <ButtonAdd openModal={openModal} />
          </div>
        </section>
        <section className="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-4">
          <CardSummary
            title="amount"
            summary={totalAmount}
            imgsrc={AmountImg.src}
            titleDetail="amount of total of bills"
            imgalt="amount total bills"
          />
          <CardSummary
            title="bills paid"
            summary={paidBillsCount}
            imgsrc={StatusPaidImg.src}
            titleDetail="total status paid of bills"
            imgalt="total paid bills"
          />
        </section>
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl">{formattedDate || currentMonth} </h2>
          <CardsList typeOfView={typeOfView} />
        </section>
      </div>
      <ModalAdd openModal={showModal} closeModal={closeModal} />
    </main>
  );
}
