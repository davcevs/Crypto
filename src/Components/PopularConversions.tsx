const conversionData = [
  { from: "USDT", to: "USD", rate: 0.999991 },
  { from: "USDT", to: "TRY", rate: 32.73 },
  { from: "USDT", to: "RUB", rate: 88.61 },
  { from: "USDT", to: "EUR", rate: 0.9229917 },
  { from: "USDT", to: "SAR", rate: 3.7499663 },
  { from: "USDT", to: "AUD", rate: 1.4799867 },
];

const PopularConversions = () => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">
        Popular Tether USDt Conversions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {conversionData.map((item, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">USDT to {item.to}</h3>
            <p className="text-gray-400">
              1 USDT = {item.rate} {item.to}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularConversions;
