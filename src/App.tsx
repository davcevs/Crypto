// App.tsx
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import MainComponent from "./Components/MainComponent";
import Academy from "./Components/Academy";
import SpotTrading from "./Components/SpotTrading";
import Register from "./Components/Register";
import { signIn } from "./Logic/RegisterLogic";
import WalletComponent from "./Components/WalletComponent";
import Markets from "./Components/Markets";
import Casino from "./Components/Casino"; // Import the Casino component
import { User } from "./Types/types";
import BuyCrypto from "./Components/BuyCrypto";

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const loggedInUser = signIn(email, password);
    if (loggedInUser) {
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      setCurrentUser(loggedInUser);
      navigate("/");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <>
      <div className="h-16 w-full bg-[#000000] z-10">
        <Header onLogout={handleLogout} currentUser={currentUser} />
      </div>
      <div className="h-full mt-5 w-5/6 m-auto z-0">
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/spot-trading" element={<SpotTrading />} />
          <Route
            path="/wallet"
            element={
              currentUser ? (
                <WalletComponent currentUser={currentUser} />
              ) : (
                <Register onSignIn={handleSignIn} />
              )
            }
          />
          <Route
            path="/register"
            element={<Register onSignIn={handleSignIn} />}
          />
          <Route path="/market" element={<Markets />} />
          <Route path="/casino" element={<Casino />} />
          <Route path="/buy-crypto" element={<BuyCrypto />} />
          {/* Add the Casino route */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
      <div className="mt-16 border-t-2 border-white">
        <Footer />
      </div>
    </>
  );
};

export default App;
