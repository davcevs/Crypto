// CryptoBasics.tsx
import CourseCard from "./../Components/CourseCard";

const CryptoBasics = () => {
  const courses = [
    {
      title: "What is Bitcoin?",
      image: "./src/assets/bitcoin.avif",
      link: "/courses/bitcoin",
    },
    {
      title: "Guide to DeFi tokens and altcoins",
      image: "./src/assets/defi.webp",
      link: "/courses/defi-tokens",
    },
    {
      title: "What is Ethereum?",
      image: "./src/assets/EthCover.webp",
      link: "/courses/ethereum",
    },
    {
      title: "What is DeFi?",
      image: "./src/assets/defi1.jpeg",
      link: "/courses/defi-intro",
    },
    {
      title: "What is a stablecoin?",
      image: "./src/assets/stablecoin.png",
      link: "/courses/stablecoin",
    },
    {
      title: "Don't FOMO: How to avoid crypto scams",
      image: "./src/assets/Crypto-Scams.jpeg",
      link: "/courses/avoid-scams",
    },
  ];

  return (
    <section className="crypto-basics py-12 bg-white m-auto px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Crypto Basics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CryptoBasics;
