const LearnCrypto = () => {
  return (
    <div className="text-white learn-container w-5/6 m-auto">
      <div className="">
        <div className="text-center text-6xl font-normal mb-3">
          <span>Learn some crypto theory</span>
        </div>
        <div className="grid w-5/6 gap-4 m-auto items-center  md:grid-cols-text-button sm:grid-cols-1">
          <div className="text-2xl font-extralight mb-2 text-center">
            <span>
              Beginner guides, practical tips, and market updates for
              first-timers, experienced investors, and everyone in between
            </span>
          </div>
          <div className="text-start justify-self-center mb-10">
            <a
              href="/academy"
              className="border-white border-2 rounded-md px-4 py-2 text-white hover:bg-gray-700 transform hover:scale-105 duration-300 ease-in-out"
            >
              Learn Crypto
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-1 gap-4 m-auto">
        <div className="grid grid-rows-1 gap-4 m-auto items-center px-4">
          <img
            className="w-5/6 m-auto rounded-xl mb-4"
            src="./src/assets/imgs/learn1.webp"
            alt="Learn Crypto"
          />
          <div className="info-learn-bold-text">
            <span>USDC: The digital dollar for the global crypto economy</span>
          </div>
          <span className="text-base text-gray mb-2 text-start">
            Coinbase believes crypto will be part of the solution for creating
            an open financial system that is both more efficient and more
            equitable. We co-founded the Centre Consortium in 2018 to invest in
            the build of USDC, and since then it has become the second largest
            stablecoin by market capitalization.
          </span>
        </div>
        <div className="grid grid-rows-1 gap-4 m-auto items-center px-4">
          <img
            className="w-5/6 m-auto rounded-xl mb-4"
            src="./src/assets/imgs/learn2.webp"
            alt="Learn Crypto"
          />
          <div className="info-learn-bold-text">
            <span>Can crypto really replace your bank account?</span>
          </div>
          <span className="text-base text-gray mb-2 text-start">
            If you’re a big enough fan of crypto, you’ve probably heard the
            phrase “be your own bank” or the term “bankless” — the idea being
            that crypto can offer more control over your financial future than
            traditional finance. But how much of your financial life really can
            be accomplished via crypto?
          </span>
        </div>
        <div className="grid grid-rows-1 gap-4 m-auto items-center px-4 justify-center">
          <img
            className="w-5/6 m-auto rounded-xl mb-4"
            src="./src/assets/imgs/learn3.webp"
            alt="Learn Crypto"
          />
          <div className="info-learn-bold-text">
            <span>When is the best time to invest in crypto?</span>
          </div>
          <span className="text-base text-gray mb-2 text-start">
            Cryptocurrencies like Bitcoin can experience daily (or even hourly)
            price volatility. As with any kind of investment, volatility may
            cause uncertainty, fear of missing out, or fear of participating at
            all. When prices are fluctuating, how do you know when to buy?
          </span>
        </div>
      </div>
    </div>
  );
};

export default LearnCrypto;
