const CourseCategories = () => {
  return (
    <section className="course-categories py-16 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8">Course Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="category-card bg-gray-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Crypto Basics</h3>
            <p className="text-lg">
              Explore foundational concepts in cryptocurrency.
            </p>
            <button className="bg-blue-900 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
              Explore Courses
            </button>
          </div>
          <div className="category-card bg-gray-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Tips and Tutorials</h3>
            <p className="text-lg">
              Discover practical tips and step-by-step tutorials.
            </p>
            <button className="bg-blue-900 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
              Explore Courses
            </button>
          </div>
          <div className="category-card bg-gray-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Advanced Trading</h3>
            <p className="text-lg">
              Dive deeper into advanced trading strategies.
            </p>
            <button className="bg-blue-900 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
              Explore Courses
            </button>
          </div>
          <div className="category-card bg-gray-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Futures</h3>
            <p className="text-lg">
              Learn about futures trading and its applications.
            </p>
            <button className="bg-blue-900 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
              Explore Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;
