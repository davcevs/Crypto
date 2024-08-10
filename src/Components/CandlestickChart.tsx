// src/components/CandlestickChart.tsx
import React, { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  CandlestickSeriesApi,
} from "lightweight-charts";

interface CandlestickChartProps {
  symbol: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<CandlestickSeriesApi | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: "#1E1E1E",
          textColor: "#FFFFFF",
        },
        grid: {
          vertLines: { color: "#2B2B43" },
          horzLines: { color: "#2B2B43" },
        },
      });

      candleSeriesRef.current = chartRef.current.addCandlestickSeries();

      // Fetch and update data
      const fetchData = async () => {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=100`
        );
        const data = await response.json();
        const formattedData = data.map((d: any) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        candleSeriesRef.current?.setData(formattedData);
      };

      fetchData();
      const interval = setInterval(fetchData, 1000);

      return () => {
        clearInterval(interval);
        chartRef.current?.remove();
      };
    }
  }, [symbol]);

  return <div ref={chartContainerRef} className="w-full h-96" />;
};

export default CandlestickChart;
