const cryptoLogos = {
  BNB: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg",
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
  USDT: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
};

const HotCryptos = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <h2 className="text-lg font-semibold mb-3">Hot Cryptos</h2>
      {[
        { symbol: "BNB", price: "$312.18", change: "+3.31%" },
        { symbol: "BTC", price: "$57,145.99", change: "+6.64%" },
        { symbol: "ETH", price: "$3,834.99", change: "+2.29%" },
        { symbol: "USDT", price: "$1.00", change: "0.00%" },
      ].map((crypto, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0"
        >
          <span className="flex items-center">
            <img
              src={cryptoLogos[crypto.symbol]}
              alt={crypto.symbol}
              className="w-6 h-6 mr-2"
            />
            {crypto.symbol}
          </span>
          <span>{crypto.price}</span>
          <span
            className={
              crypto.change.startsWith("+") ? "text-green-500" : "text-red-500"
            }
          >
            {crypto.change}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HotCryptos;
