// Regsiter.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailIcon, LockClosedIcon } from "@heroicons/react/outline";
import { createAccount, signIn } from "./../Logic/RegisterLogic";

interface Props {
  onSignIn: (email: string, password: string) => void;
}

const Register = ({ onSignIn }: Props) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      if (!passwordsMatch) {
        alert("Passwords do not match!");
        return;
      }

      if (createAccount(email, password)) {
        alert("Account created successfully! Please sign in.");
        setIsSignUp(false);
        onSignIn(email, password); // Update parent component state on sign-in
        navigate("/");
      } else {
        alert("Email already in use. Please try a different email.");
      }
    } else {
      onSignIn(email, password); // Update parent component state on sign-in
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        {isSignUp && (
          <>
            <div className="flex justify-between space-x-4">
              <a
                href="#"
                className="flex items-center justify-center w-full py-2 font-semibold text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
              >
                <img
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="ml-2">Use Google</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-full py-2 font-semibold text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
              >
                <img
                  src="https://cdn.iconscout.com/icon/free/png-512/free-facebook-262-721949.png?f=webp&w=256"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                <span className="ml-2">Use Facebook</span>
              </a>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-full border-b border-gray-300"></div>
              <span className="text-gray-500">OR</span>
              <div className="w-full border-b border-gray-300"></div>
            </div>
          </>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor={isSignUp ? "email" : "signin-email"}
              className="sr-only"
            >
              Email
            </label>
            <input
              aria-label="Email"
              type="email"
              id={isSignUp ? "email" : "signin-email"}
              name="email"
              placeholder="Your Email"
              autoComplete={isSignUp ? "off" : "on"}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <MailIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <label
              htmlFor={isSignUp ? "password" : "signin-password"}
              className="sr-only"
            >
              Password
            </label>
            <input
              id={isSignUp ? "password" : "signin-password"}
              type="password"
              name="password"
              placeholder="Your Password"
              title="Minimum 6 characters at least 1 Alphabet and 1 Number"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <LockClosedIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {isSignUp && (
            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">
                Repeat Password
              </label>
              <input
                id="confirm-password"
                type="password"
                name="password"
                placeholder="Repeat Password"
                title="Minimum 6 characters at least 1 Alphabet and 1 Number"
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <LockClosedIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isSignUp ? "Sign-Up" : "Sign-In"}
          </button>
        </form>
        <div className="flex justify-between text-sm">
          {isSignUp ? (
            <>
              <div>
                By registering you agree to our{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Privacy
                </a>
              </div>
              <div className="text-center">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp(false);
                  }}
                >
                  Sign-in
                </a>
              </div>
            </>
          ) : (
            <>
              <div>
                Forgot your password?{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Reset Password
                </a>
              </div>
              <div className="text-center">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp(true);
                  }}
                >
                  Sign-up
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
