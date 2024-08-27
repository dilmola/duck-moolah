import { useContext } from "react";
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

export default function Home() {
  const {
    typeOfView,
    setTypeOfView,
    closeModal,
    openModal,
    showModal,
    formattedDate,
    userdata: UserNameData,
  } = useContext(GlobalContext);

  const totalAmount = useAmount();
  const currentMonth = useCurrentMonthYear();
  const userName =
    UserNameData && UserNameData.length > 0
      ? UserNameData[0].user_name
      : "No User";

  return (
    <main className="min-h-screen bg-gradient pt-12">
      <div className="container mx-auto flex flex-col space-y-20 px-28">
        <Header userName={userName} />
        <section className="mt-12 space-y-4">
          <h2 className="text-5xl font-semibold">trace your bill here</h2>
          <h3 className="text-2xl font-thin text-white/20">
            find all your expenses and commitment only in one system
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
        <section className="mt-12 space-y-4">
          <h2 className=" text-2xl">{formattedDate || currentMonth} </h2>
          <CardsList typeOfView={typeOfView} />
        </section>
        <div className="relative h-20">
          <div className="fixed bottom-10 transform translate-x-[71rem] bg-black/10 backdrop-blur-sm p-4 rounded-lg flex flex-row space-x-2">
            <div>Amount: RM</div> <div>{totalAmount}</div>
          </div>
        </div>
      </div>
      <ModalAdd openModal={showModal} closeModal={closeModal} />
    </main>
  );
}
