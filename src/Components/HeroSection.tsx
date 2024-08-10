const HeroSection = () => {
  return (
    <section className="hero-section bg-blue-900 text-white py-20 px-8 text-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold mb-8 leading-tight">
          Welcome to Crypto Academy
        </h1>
        <p className="text-lg mb-10">
          Master the fundamentals of blockchain and cryptocurrency with expert
          guidance.
        </p>
        <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300">
          Start Learning
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
