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
    amount: data.bill_amount, // Change bill_amount to amount here
  }));
  return (
    <div
      style={{
        backgroundImage: 'url("/background/dot-back.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <div className="overflow-x-auto md:overflow-x-hidden">
        <div className="min-w-[600px] md:min-w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={formattedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                stroke="rgba(255, 255, 255, 0.06)"
                strokeDasharray="3 3"
              />
              <XAxis dataKey="date_bill_created" />
              <YAxis dataKey="amount" />
              <Bar
                dataKey="amount"
                fill="#f7b267"
                barSize={20}
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
