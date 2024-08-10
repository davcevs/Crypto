const Resources = () => {
  return (
    <section className="resources py-16 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="resource-card bg-gray-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">What is...</h3>
            <p className="text-lg">
              Explore our glossary of common cryptocurrency terms.
            </p>
            <button className="bg-blue-900 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
              Explore Glossary
            </button>
          </div>
          <div className="resource-card bg-gray-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Tips and Tutorials</h3>
            <p className="text-lg">
              Discover practical tips and tutorials for crypto enthusiasts.
            </p>
            <button className="bg-blue-900 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
              Explore Tips
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
