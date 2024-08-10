// src/Components/MainComponent.tsx
import SignUpSection from "./SignUpSection";
import CoinSide from "./CoinSide";
import NewsFetcher from "./NewsFetcher";
import BuyButton from "./BuyButton";
import "../styles/custom.css";
import "../styles/mainPage.css";
import Slider from "./Slider";
import MobileApp from "./MobileApp";
import LearnCrypto from "./LearnCrypto";

const MainComponent = () => {
  return (
    <>
      <SignUpSection />
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4 m-auto items-end">
        {/* Left side (Bitcoin price component) */}
        <div className="btc-spinner m-auto">
          <div className="coin">
            <CoinSide side="heads" />
            <CoinSide side="tails" />
          </div>

          {/* Add the BuyButton below the Bitcoin price component */}
          <div className="mt-4">
            <BuyButton text="Buy BTC" />
          </div>
        </div>

        {/* Right side (News) */}
        <div className="grid gap-4 justify-items-center items-center mr-16">
          {/* News section */}
          <div className="h-fit m-auto">
            <NewsFetcher />
          </div>
        </div>
      </div>
      <div className="mb-16">
        <Slider />
      </div>
      <div>
        <MobileApp />
      </div>
      <LearnCrypto />
    </>
  );
};

export default MainComponent;
