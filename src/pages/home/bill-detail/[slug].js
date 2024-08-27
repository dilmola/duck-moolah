import { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router"; // Import useRouter

import Header from "@/components/header/header";
import GlobalContext from "@/context/globalContext";
import BarChart from "@/components/chart/chart-bar";
import CardChart from "@/components/cards/card-chart/card-chart"; // Import the Card component

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
        percentageIncrease: increase > 0 ? increase.toFixed(2) : 0,
        percentageDecrease: decrease > 0 ? decrease.toFixed(2) : 0,
      };
    }
    return { percentageIncrease: 0, percentageDecrease: 0 };
  }, [ChartUserData]);

  return (
    <main className="min-h-screen bg-gradient pt-12">
      <div className="container mx-auto flex flex-col space-y-20 px-28">
        <Header userName={userName} />
        <section className="space-y-4">
          <h2 className="text-5xl font-semibold">Detail</h2>
          <h3 className="text-2xl font-thin text-white/20">
            view a bill detail
          </h3>
        </section>
        <section className="space-y-4 rounded-lg border border-white/10">
          <div className="space-x-4 flex flex-row p-6">
            <CardChart
              title="Percentage Increase"
              percentage={percentageIncrease}
            />
            <CardChart
              title="Percentage Decrease"
              percentage={percentageDecrease}
            />
          </div>
          <BarChart ChartUserData={ChartUserData} />
        </section>
      </div>
    </main>
  );
}
