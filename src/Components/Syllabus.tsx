const Syllabus = () => {
  const modules = [
    {
      title: "Module 1: Introduction to Bitcoin",
      videos: 5,
      quizzes: 2,
    },
    {
      title: "Module 2: Understanding Ethereum",
      videos: 4,
      quizzes: 1,
    },
    {
      title: "Module 3: DeFi Tokens and Altcoins",
      videos: 6,
      quizzes: 2,
    },
    {
      title: "Module 4: Stablecoins and Their Role",
      videos: 3,
      quizzes: 1,
    },
    {
      title: "Module 5: Cryptocurrency Security",
      videos: 4,
      quizzes: 1,
    },
  ];

  return (
    <section className="syllabus py-16 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-12">Course Syllabus</h2>
        <ul className="divide-y divide-gray-300">
          {modules.map((module, index) => (
            <li key={index} className="py-8">
              <h3 className="text-2xl font-semibold mb-4">{module.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-lg">
                  Videos: {module.videos} | Quizzes: {module.quizzes}
                </p>
                <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Syllabus;
