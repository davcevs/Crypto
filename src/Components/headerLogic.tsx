// headerLogic.tsx
import { Link } from "react-router-dom";

export function HeaderForLoggedInUser({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void;
}) {
  return (
    <>
      <span className="text-gray-400">User: {email}</span>
      <a
        href="#"
        title="Log out"
        className="text-gray-400 hover:text-[#fcfcfc] transition-all duration-300 ease"
        onClick={(e) => {
          e.preventDefault();
          onLogout();
        }}
      >
        Log out
      </a>
    </>
  );
}

export function HeaderForLoggedOutUser() {
  const handleClick = () => {
    localStorage.setItem("previousURL", location.href);
    console.log("Previous URL stored:", location.href);
  };

  return (
    <>
      <Link
        to="/register"
        title="Log in"
        className="text-gray-400 hover:text-[#fcfcfc] transition-all duration-300 ease"
        onClick={handleClick}
      >
        Log In
      </Link>
      <Link
        to="/register"
        title="Sign up"
        className="text-[#fcfcfc] bg-[#3861fb] hover:bg-[#3861fb]/80 transition-all duration-300 ease px-4 py-2 rounded-full"
        onClick={handleClick}
      >
        Sign up
      </Link>
    </>
  );
}
