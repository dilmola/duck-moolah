import { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router"; // Import useRouter

import Header from "@/components/header/header";
import GlobalContext from "@/context/globalContext";
import BarChart from "@/components/chart/chart-bar";
import CardSummary from "@/components/cards/card-summary/card-summary"; // Import the Card component
import UpImg from "../../../../public/icons/icon-up.png";
import DownImg from "../../../../public/icons/icon-down.png";

export default function BillDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const {
    userdata: UserNameData,
    chartdata: ChartUserData,
    getIdDataChartBills,
  } = useContext(GlobalContext);

  const userName =
    UserNameData && UserNameData.length > 0
      ? UserNameData[0].user_name
      : "No User";

  const firstBillName =
    ChartUserData && ChartUserData.length > 0
      ? ChartUserData[0].name_of_bill
      : "No Bill Name";

  useEffect(() => {
    if (slug) {
      getIdDataChartBills(slug);
    }
  }, [slug]);

  const { percentageIncrease, percentageDecrease } = useMemo(() => {
    if (ChartUserData && ChartUserData.length > 1) {
      const latestAmount = ChartUserData[ChartUserData.length - 1].bill_amount;
      const previousAmount =
        ChartUserData[ChartUserData.length - 2].bill_amount;

      const increase = ((latestAmount - previousAmount) / previousAmount) * 100;
      const decrease = ((previousAmount - latestAmount) / previousAmount) * 100;

      return {
        percentageIncrease: increase > 0 ? `${increase.toFixed(2)}%` : "0%",
        percentageDecrease: decrease > 0 ? `${decrease.toFixed(2)}%` : "0%",
      };
    }
    return { percentageIncrease: 0, percentageDecrease: 0 };
  }, [ChartUserData]);

  return (
    <main className="min-h-screen bg-gradient pt-12">
      <div className="container mx-auto flex flex-col md:space-y-20 space-y-12 md:px-28 px-4">
        <Header userName={userName} />
        <section className="space-y-4">
          <h2 className="md:text-5xl text-4xl font-semibold">
            Bill Details & Insights
          </h2>
          <h3 className="md:text-2xl text-xl font-thin text-white/20">
            view detailed information about your bill or expense, and see trends
            with visual bar graphs showing changes over time.
          </h3>
        </section>
        <section className="space-y-6 rounded-lg border border-white/10">
          <section className="md:p-6 p-4 space-y-4">
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="text-gray-500/70">Name of bill</h3>
                <a className="text-2xl">{firstBillName}</a>
              </div>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-4 space-y-2">
              <CardSummary
                title="percentage Increase"
                summary={percentageIncrease}
                imgsrc={UpImg.src}
                titleDetail="percentage increasing of that newest month"
                imgalt="percentage increase"
              />
              <CardSummary
                title="percentage decrease"
                summary={percentageDecrease}
                imgsrc={DownImg.src}
                titleDetail="percentage decreasing of that newest month"
                imgalt="percentage decrease"
              />
            </div>
          </section>
          <BarChart ChartUserData={ChartUserData} />
        </section>
      </div>
    </main>
  );
}
