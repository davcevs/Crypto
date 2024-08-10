import { useState, useEffect } from "react";
import "../styles/slider.css";
import {
  fetchCoinData,
  startDataFetchingInterval,
} from "./../Helpers/apiHelpers";

const Slider = () => {
  const [coinData, setCoinData] = useState([]);
  const [previousPrices, setPreviousPrices] = useState({});
  const [tokenImages, setTokenImages] = useState({});

  useEffect(() => {
    // Fetch token images
    const fetchTokenImages = async () => {
      try {
        const response = await fetch("../src/Data/tokens.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const images = data.reduce((acc, token) => {
          acc[token.tokenName] = token.photo;
          return acc;
        }, {});
        setTokenImages(images);
      } catch (error) {
        console.error("Error fetching token images:", error);
      }
    };

    fetchTokenImages();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoinData();
        setCoinData((prevData) => {
          const prevPrices = {};
          prevData.forEach((coin) => {
            prevPrices[coin.symbol] = parseFloat(coin.price);
          });
          setPreviousPrices(prevPrices);
          return data.map((coin) => ({
            ...coin,
            photo: tokenImages[coin.symbol],
          }));
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const cleanup = startDataFetchingInterval(fetchData, 5000);

    return () => cleanup();
  }, [tokenImages]);

  const getTextColorClass = (priceChangePercent) => {
    if (priceChangePercent > 0) {
      return "green-text";
    } else if (priceChangePercent < 0) {
      return "red-text";
    }
    return "";
  };

  const getPriceColorClass = (symbol, price) => {
    const previousPrice = previousPrices[symbol];
    if (previousPrice === undefined) return "";
    if (price > previousPrice) {
      return "green-text";
    } else if (price < previousPrice) {
      return "red-text";
    }
    return "";
  };

  return (
    <div className="slider">
      {coinData.map((coin, index) => (
        <div key={index} className={`item item${index + 1}`}>
          <div className="text-white m-auto item-content">
            <img src={coin.photo} alt={coin.symbol} className="coin-image" />
            <span className="coin-name">{coin.symbol}</span>
            <div className="grid grid-cols-2 m-auto price-change">
              <div
                className={`price ${getPriceColorClass(
                  coin.symbol,
                  parseFloat(coin.price)
                )}`}
              >
                ${parseFloat(coin.price).toFixed(2)}
              </div>
              <div
                className={`percentage ${getTextColorClass(
                  parseFloat(coin.priceChangePercent)
                )}`}
              >
                {parseFloat(coin.priceChangePercent).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
