// Academy.tsx
import HeroSection from "./../Components/HeroSection";
import FeaturedCourse from "./../Components/FeaturedCourse";
import CourseCategories from "./../Components/CourseCategories";
import CryptoBasics from "./../Components/CryptoBasics";
import BeginnerTrack from "../Components/BeginnerTrack";
import Syllabus from "./../Components/Syllabus";
// import Resources from "../Components/Resources";
import ResourceSection from "./ResourceSection";

const Academy = () => {
  return (
    <div className="academy-page min-h-screen">
      <HeroSection />
      <FeaturedCourse />
      <CourseCategories />
      <CryptoBasics />
      <BeginnerTrack />
      <Syllabus />
      <ResourceSection />
    </div>
  );
};

export default Academy;
