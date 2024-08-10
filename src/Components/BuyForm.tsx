const BuyForm = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex mb-6">
        <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-l-lg focus:outline-none hover:bg-blue-700 transition duration-300">
          Buy
        </button>
        <button className="flex-1 py-3 px-4 bg-gray-700 text-gray-300 rounded-r-lg focus:outline-none hover:bg-gray-600 transition duration-300">
          Sell
        </button>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Amount
          </label>
          <input
            id="amount"
            type="text"
            placeholder="Enter Amount"
            className="w-full bg-gray-700 text-black p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
          />
          <select className="absolute right-2 top-[60%] transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="THB">THB</option>
            <option value="USDT">USDT</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="receive"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            You'll receive
          </label>
          <input
            id="receive"
            type="text"
            placeholder="0.00"
            disabled
            className="w-full bg-gray-700 text-white p-3 rounded-lg"
          />
        </div>
        <button className="w-full bg-yellow-500 text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300 transform hover:scale-105">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BuyForm;
