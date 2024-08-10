import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "8:00 PM", value: 34.35 },
  { name: "12:00 AM", value: 34.4 },
  { name: "4:00 AM", value: 34.38 },
  { name: "8:00 AM", value: 34.41 },
];

const UsdtMarkets = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 my-8">
      <h2 className="text-2xl font-bold mb-4">Tether USDt Markets</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-full mr-2"></div>
          <span className="font-semibold">USDT/THB</span>
        </div>
        <div className="text-2xl font-bold">$ 34.41</div>
        <div className="text-red-500">-0.02%</div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          Rank: <span className="font-semibold">#3</span>
        </div>
        <div>
          Market Cap: <span className="font-semibold">$84,085.52B</span>
        </div>
        <div>
          Volume: <span className="font-semibold">$2,375.74B</span>
        </div>
        <div>
          Circulating Supply: <span className="font-semibold">112.21B</span>
        </div>
      </div>
    </div>
  );
};

export default UsdtMarkets;
