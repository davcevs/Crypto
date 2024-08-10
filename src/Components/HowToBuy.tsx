const HowToBuy = () => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">How to Buy Crypto</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          "Enter Amount & Select Payment",
          "Confirm Order",
          "Receive Crypto",
        ].map((step, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step}</h3>
            <p className="text-gray-400 text-sm">
              {index === 0 &&
                "Enter the amount and select your preferred payment method."}
              {index === 1 && "Review and confirm your transaction details."}
              {index === 2 &&
                "Once payment is successful, crypto will be added to your wallet."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToBuy;
