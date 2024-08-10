const MobileApp = () => {
  return (
    <div className="grid justify-items-center items-center mobile-app text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 ml-3 items-center justify-items-center">
        <img
          src="../src/assets/imgs/hero_3x.webp"
          alt="Crypto Simulator"
          className="w-4/5 h-auto mb-10 ml-36"
        />
        <div className="grid items-end justify-items-center ">
          <h1 className="text-center text-sm">
            A mobile app for crypto enthusiasts to learn about the latest trends
            in the crypto world.
          </h1>
          <img
            src="../src/assets/imgs/qr_code.png"
            className="w-2/6 h-auto mb-10 mt-4 rounded"
            alt="QR Code"
          />
          <button className="border-white border-2 rounded-md px-4 py-2 text-white hover:bg-gray-700 transform hover:scale-105 duration-300 ease-in-out">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
