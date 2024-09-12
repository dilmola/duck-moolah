import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartBar = ({ ChartUserData }) => {
  const paddingBottom = 10;
  const borderRadius = 10;
  const paddingTop = 10;

  const [isMd, setIsMd] = useState(false);

  // Check screen width and update the `isMd` state
  const updateChartLayout = () => {
    const screenWidth = window.innerWidth;
    setIsMd(screenWidth >= 768); // md breakpoint (768px)
  };

  useEffect(() => {
    updateChartLayout();
    window.addEventListener("resize", updateChartLayout);
    return () => window.removeEventListener("resize", updateChartLayout);
  }, []);

  const RoundedBar = (props) => {
    const { x, y, width, height, fill } = props;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height - paddingBottom - paddingTop}
        fill={fill}
        rx={borderRadius}
        ry={borderRadius}
      />
    );
  };

  const formatDate = (date) => {
    const options = { month: "2-digit", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate.replace("/", "/");
  };

  const formattedData = ChartUserData.map((data) => ({
    ...data,
    date_bill_created: formatDate(data.date_bill_created),
    amount: data.bill_amount,
  }));

  return (
    <div
      style={{
        backgroundImage: 'url("/background/dot-back.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: isMd ? "20px" : "0px",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <div className={isMd ? "overflow-x-auto" : "overflow-x-hidden"}>
        <div className={isMd ? "min-w-[600px]" : "min-w-full"}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={formattedData}
              margin={{
                top: isMd ? 20 : 0,
                right: isMd ? 30 : 0,
                left: isMd ? 20 : 0,
                bottom: isMd ? 5 : 0,
              }}
              barCategoryGap={isMd ? 20 : 0} 
            >
              <CartesianGrid
                stroke="rgba(255, 255, 255, 0.06)"
                strokeDasharray="3 3"
              />
              <XAxis dataKey="date_bill_created" />
              {isMd && <YAxis dataKey="amount" />}
              <Bar
                dataKey="amount"
                fill="#f7b267"
                barSize={isMd ? 20 : 16}
                shape={(props) => <RoundedBar {...props} />}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "#333",
                  borderRadius: "10px",
                  border: "none",
                  color: "#fff",
                }}
                labelStyle={{ fontWeight: "bold" }}
                itemStyle={{ color: "#f7b267" }}
                formatter={(value) => `RM ${value}`}
              />
              <Legend
                verticalAlign="top"
                align="center"
                wrapperStyle={{
                  paddingBottom: 10,
                  fontSize: "14px",
                  color: "#ffffff",
                }}
                iconType="circle"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartBar;
