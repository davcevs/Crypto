// src/Components/SignUpSection.tsx

const SignUpSection = () => {
  return (
    <div className="grid grid-rows1 justify-center text-white">
      <div className=" grid grid-rows1 justify-center sign-up-bold-text">
        <span>The Future of Money</span>
      </div>
      <div className="grid grid-rows1 justify-center">
        <span className="grid grid-rows1 justify-center sign-up-subtext">
          We're the most trusted place for people and businesses to buy, sell,
          and manage crypto.
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 m-auto items-end gap-4 mt-4">
          <input
            type="text"
            className="border-white border-2 rounded-md px-4 py-2 text-black hover:bg-gray-700 transform hover:scale-105 duration-300 ease-in-out"
            placeholder="Email"
          />
          <button className="border-white border-2 rounded-md px-4 py-2 text-white hover:bg-gray-700 transform hover:scale-105 duration-300 ease-in-out">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpSection;
