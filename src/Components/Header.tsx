import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  HeaderForLoggedInUser,
  HeaderForLoggedOutUser,
} from "./../Components/headerLogic";
import {
  ChatIcon,
  ChevronDownIcon,
  CubeIcon,
  DeviceMobileIcon,
  GlobeIcon,
  LightningBoltIcon,
  MenuIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";
import { User } from "../Types/types";

const Header = ({
  currentUser,
  onLogout,
}: {
  currentUser: User;
  onLogout: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tradingOpen, setTradingOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const openTrading = () => setTradingOpen(true);
  const closeTrading = () => setTradingOpen(false);

  return (
    <header className="flex fixed justify-between w-full z-20 gap-6 bg-[#000000] h-[64px] px-8 items-center shadow">
      <div className="flex items-center">
        <Link
          to="/"
          title="Home"
          aria-label="home"
          className="cursor-pointer flex items-center"
        >
          <img
            src="../src/assets/imgs/2.png"
            width="100px"
            alt="Crypto Simulator"
          />
        </Link>
      </div>
      <nav
        className={`md:flex ${
          menuOpen ? "block" : "hidden"
        } bg-[#000000] md:bg-transparent`}
      >
        <ul className="flex flex-col md:flex-row list-none items-center gap-4">
          <li
            className="relative cursor-pointer flex items-center min-h-[2.25rem]"
            onMouseEnter={openTrading}
            onMouseLeave={closeTrading}
          >
            <button className="text-gray-400 h-12 transition-all duration-300 ease no-underline border-none cursor-pointer z-10 mr-[-0.25rem] flex items-center min-h-[2.25rem] text-sm gap-1 font-sans flex-nowrap rounded-full px-2.5 bg-none relative transition-all duration-200 ease-in-out">
              Trading
              <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {tradingOpen && (
              <div className="absolute mt-12s top-12 w-[20rem] bg-[#010101] border border-[#2e2e2e] rounded-md z-20 animate-fadeIn">
                <ul className="list-none grid grid-cols-2 w-full">
                  <li className="flex p-2 gap-4 transition-all duration-200 ease-in-out rounded-md hover:bg-[#e1e1e1]">
                    <ChatIcon
                      className="stroke-[#fcfcfc] stroke-[1px] w-6 h-6"
                      aria-hidden="true"
                    />
                    <div className="item-title">
                      <NavLink to="/spot-trading">
                        <h3 className="font-medium text-sm text-[#fcfcfc]">
                          Spot Trading
                        </h3>

                        <p className="text-[0.7rem] text-gray-400">
                          Buy and sell crypto on Spot Markets
                        </p>
                      </NavLink>
                    </div>
                  </li>
                  <li className="flex p-2 gap-4 transition-all duration-200 ease-in-out rounded-md hover:bg-[#e1e1e1]">
                    <CubeIcon
                      className="stroke-[#fcfcfc] stroke-[1px] w-6 h-6"
                      aria-hidden="true"
                    />
                    <div className="item-title">
                      <NavLink to="/earn-crypto">
                        <h3 className="font-medium text-sm text-[#fcfcfc]">
                          Earn Crypto
                        </h3>

                        <p className="text-[0.7rem] text-gray-400">
                          Stake your crypto to earn rewards
                        </p>
                      </NavLink>
                    </div>
                  </li>
                  <li className="flex p-2 gap-4 transition-all duration-200 ease-in-out rounded-md hover:bg-[#e1e1e1]">
                    <DeviceMobileIcon
                      className="stroke-[#fcfcfc] stroke-[1px] w-6 h-6"
                      aria-hidden="true"
                    />
                    <div className="item-title">
                      <NavLink to="/margin-trading">
                        <h3 className="font-medium text-sm text-[#fcfcfc]">
                          Margin Trading
                        </h3>

                        <p className="text-[0.7rem] text-gray-400">
                          Use leverage to increase your profits
                        </p>
                      </NavLink>
                    </div>
                  </li>
                  <li className="flex p-2 gap-4 transition-all duration-200 ease-in-out rounded-md hover:bg-[#e1e1e1]">
                    <GlobeIcon
                      className="stroke-[#fcfcfc] stroke-[1px] w-6 h-6"
                      aria-hidden="true"
                    />
                    <div className="item-title">
                      <NavLink to="/airdrops">
                        <h3 className="font-medium text-sm text-[#fcfcfc]">
                          Airdrops
                        </h3>

                        <p className="text-[0.7rem] text-gray-400">
                          Earn rewards for your contributions
                        </p>
                      </NavLink>
                    </div>
                  </li>
                  <li className="flex p-2 gap-4 transition-all duration-200 ease-in-out rounded-md hover:bg-[#e1e1e1]">
                    <LightningBoltIcon
                      className="stroke-[#fcfcfc] stroke-[1px] w-6 h-6"
                      aria-hidden="true"
                    />
                    <div className="item-title">
                      <NavLink to="/web3">
                        <h3 className="font-medium text-sm text-[#fcfcfc]">
                          Web3
                        </h3>
                        <p className="text-[0.7rem] text-gray-400">
                          Learn about the latest trends in Web3
                        </p>
                      </NavLink>
                    </div>
                  </li>
                  <li className="flex p-2 gap-4 transition-all duration-200 ease-in-out rounded-md hover:bg-[#e1e1e1]">
                    <ShieldCheckIcon
                      className="stroke-[#fcfcfc] stroke-[1px] w-6 h-6"
                      aria-hidden="true"
                    />
                    <div className="item-title">
                      <NavLink to="/wallet">
                        <h3 className="font-medium text-sm text-[#fcfcfc]">
                          Wallet
                        </h3>

                        <p className="text-[0.7rem] text-gray-400">
                          Your crypto wallet
                        </p>
                      </NavLink>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <NavLink
              to="/buy-crypto"
              title="Buy Crypto"
              className="text-gray-400 text-sm no-underline hover:text-[#fcfcfc] transition-all duration-300 ease"
            >
              Buy Crypto
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/market"
              title="Markets"
              className="text-gray-400 text-sm no-underline hover:text-[#fcfcfc] transition-all duration-300 ease"
            >
              Markets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nfts"
              title="Community"
              className="text-gray-400 text-sm no-underline hover:text-[#fcfcfc] transition-all duration-300 ease"
            >
              NFTs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/academy"
              title="Academy"
              className="text-gray-400 text-sm no-underline hover:text-[#fcfcfc] transition-all duration-300 ease"
            >
              Crypto Academy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/casino"
              title="Casino"
              className="text-gray-400 text-sm no-underline hover:text-[#fcfcfc] transition-all duration-300 ease"
            >
              Crypto Casino
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="hidden md:flex gap-2 items-center flex-nowrap">
        {currentUser ? (
          <HeaderForLoggedInUser
            email={currentUser.email}
            onLogout={onLogout}
          />
        ) : (
          <HeaderForLoggedOutUser />
        )}
      </div>
      <button
        aria-label="Open menu"
        className="md:hidden outline-none border-none cursor-pointer bg-transparent flex items-center justify-center rounded-full h-8 w-8 min-w-8 min-h-8 pointer-events-all gap-1 flex-col border border-gray-border"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon className="h-6 w-6 stroke currentColor" aria-hidden="true" />
      </button>
    </header>
  );
};

export default Header;
