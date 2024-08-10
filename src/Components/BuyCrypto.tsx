import HotCryptos from "./HotCryptos";
import BuyForm from "./BuyForm";
import HowToBuy from "./HowToBuy";
import UsdtMarkets from "./UsdtMarkets";
import PopularConversions from "./PopularConversions";

const BuyCrypto = () => {
  return (
    <div className="buy-crypto-container bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Buy Crypto</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <HotCryptos />
        <BuyForm />
      </div>
      <HowToBuy />
      <UsdtMarkets />
      <PopularConversions />
    </div>
  );
};

export default BuyCrypto;
