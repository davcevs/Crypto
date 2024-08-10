const BeginnerTrack = () => {
  return (
    <section className="beginner-track py-16 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-12">Beginner Track</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="course-details">
            <h3 className="text-2xl font-semibold mb-6">
              Introduction to Cryptocurrency
            </h3>
            <p className="text-lg mb-6">
              Master the basics of crypto investing and blockchain technology.
            </p>
            <div className="course-meta">
              <p className="text-base text-gray-600 mb-4">Duration: 4 weeks</p>
              <p className="text-base text-gray-600 mb-4">
                Skill Level: Beginner
              </p>
              <p className="text-base text-gray-600 mb-4">
                NFT Certificates Available
              </p>
            </div>
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300">
              Start Course
            </button>
          </div>
          <div className="nft-certificates grid grid-cols-4 gap-4">
            {/* Showcase NFT certificates images */}
            <img
              src="./src/assets/nftcertificate.webp"
              alt="NFT Certificate 1"
              className="w-full h-auto rounded-lg shadow-md shadow-purple-500 hover:transition-all hover:scale-110 ease-in-out duration-300"
            />
            {/* Repeat for other certificates */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginnerTrack;
