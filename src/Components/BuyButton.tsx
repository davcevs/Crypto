// src/Components/BuyButton.tsx
import React from "react";
import BitcoinSvg from "./BitcoinSvg";

interface BuyButtonProps {
  text: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({ text }) => (
  <button className="btc-btn">
    <span className="box">
      {text}
      {[...Array(5)].map((_, index) => (
        <div key={index} className={`star-${index + 1}`}>
          <BitcoinSvg />
        </div>
      ))}
    </span>
  </button>
);

export default BuyButton;
