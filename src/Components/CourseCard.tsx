// CourseCard.tsx
import { Link } from "react-router-dom";

const CourseCard = ({ title, image, link }) => {
  return (
    <Link
      to={link}
      className="course-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300">
          Start Learning
        </button>
      </div>
    </Link>
  );
};

export default CourseCard;
