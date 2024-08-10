const FeaturedCourse = () => {
  return (
    <section className="featured-course py-16 text-black bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">Featured Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="course-video bg-gray-800 rounded-lg overflow-hidden">
            <img
              src="./src/assets/videoplaceholder.webp"
              alt="Course Video"
              className="w-full h-auto"
            />
          </div>
          <div className="course-description">
            <h3 className="text-2xl font-semibold mb-4">
              When is the best time to invest in crypto?
            </h3>
            <p className="text-lg mb-6">
              Discover key strategies and insights for making informed
              cryptocurrency investments.
            </p>
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300">
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourse;
