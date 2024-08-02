import { useState, useContext } from "react";
import { Nunito_Sans } from "next/font/google";
import Header from "@/components/header/header";
import Search from "@/components/search/search";
import ButtonView from "@/components/buttons/button-view/button-view";
import ButtonSort from "@/components/buttons/button-sort/button-sort";
import ButtonDownload from "@/components/buttons/button-download/button-download";
import ButtonAdd from "@/components/buttons/button-add/button-add";
import CardList from "@/components/cards/cards-list";
import ModalAdd from "@/components/modals/modal-add";
import ViewContext from "@/context/viewContext";
import useGetAllDataBills from "@/hooks/useGetAllDataBills";

const Nunito_Sans_init = Nunito_Sans({ subsets: ["latin"] });

export default function Home() {
  const { typeOfView, setTypeOfView } = useContext(ViewContext);
  const [showModal, setShowModal] = useState(false);
  const { data } = useGetAllDataBills("/api/get-all-data-bills");

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main
      className={`min-h-screen bg-gradient pt-12 selection:text-white selection:bg-[#f7a866] ${Nunito_Sans_init.className}`}
    >
      <div className="container mx-auto flex flex-col space-y-20 px-28">
        <Header />
        <section className="mt-12 space-y-4">
          <h1 className="text-8xl font-semibold mb-8">Search</h1>
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
            <ButtonAdd onOpen={openModal} />
          </div>
        </section>
        <section className="mt-12 space-y-4">
          <h2 className=" text-2xl">January 2024</h2>
          <CardList cards={data} typeOfView={typeOfView} />
        </section>
        <div className="relative h-20">
          <div className="fixed bottom-10 transform translate-x-[71rem] bg-black/10 backdrop-blur-sm p-4 rounded-lg">
            Amount: RM10000
          </div>
        </div>
      </div>
      <ModalAdd showModal={showModal} onClose={closeModal} />
    </main>
  );
}
