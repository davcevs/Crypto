import { Link } from "react-router-dom";
import CourseCompletionButton from "./CourseCompletionButton";

const CourseSection = ({ title, description, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <Link
        to={link}
        className="w-24 block mt-4 bg-yellow-500 text-gray-900 hover:bg-yellow-600 hover:text-gray-100 text-center font-semibold py-2 px-4 rounded"
      >
        Learn
      </Link>
      {/* Course Completion Button */}
      <CourseCompletionButton />
    </div>
  );
};

export default CourseSection;
