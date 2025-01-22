import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import RadialChart from '../../components/gainLose/RadialChart';
import Metrics from '../../components/gainLose/Metrics';


const ECommerce: React.FC = () => {
 
    const [stocks, setStocks] = useState([]);
    const [currentValue, setCurrentValue] = useState([]);
    const [labels, setLabels] = useState([]);
    const [portfolioMetrics, setPortfolioMetrics] = useState({
      totalValue: 0,
      totalInvestment: 0,
      portfolioReturn: 0,
      avgPurchasePrice: 0,
    });
    const [chartData, setChartData] = useState({
      series: [0], // Placeholder for initial rendering
      labels: ['No Data'], // Placeholder label
    });
  
    const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
  
    // Fetch stocks from backend
    useEffect(() => {
      axios
        .get('http://localhost:8080/api/stocks')
        .then(async (response) => {
          const stockData = response.data.stocks;
          const mappedStockData = stockData.map((stock) => ({
            ...stock,
            purchasePrice: stock.buyPrice,
          }));
  
          setStocks(mappedStockData);
  
          const updatedStocks = await fetchCurrentPrices(mappedStockData);
          calculateMetrics(updatedStocks);
  
          const seriesData = updatedStocks.map((stock) => stock.quantity);
          const labelsData = updatedStocks.map((stock) => stock.name);
  
          setChartData({
            series: seriesData,
            labels: labelsData,
          });
          setLabels(labelsData);
        })
        .catch((error) => {
          console.error('There was an error fetching the stocks!', error);
        });
    }, []);
  
    // Fetch current stock price from Finnhub API
    const fetchCurrentPrices = async (stocks) => {
      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          const symbol = stock.ticker;
  
          try {
            const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
              params: {
                symbol: symbol,
                token: API_KEY,
              },
            });
  
            stock.currentPrice = response.data.c;
            return stock;
          } catch (error) {
            console.error('Error fetching price for', symbol, error);
            stock.currentPrice = 0;
            return stock;
          }
        })
      );
      return updatedStocks;
    };
  
    // Calculate portfolio metrics
    const calculateMetrics = (stocks) => {
      let totalValue = 0;
      let totalInvestment = 0;
      let totalQuantity = 0;
      let totalPurchaseValue = 0;
  
      const stockCurrentValues = stocks.map((stock) => {
        const { quantity, purchasePrice, currentPrice } = stock;
  
        if (!quantity || !currentPrice) return 0; // Default to 0 if data is missing
  
        const stockValue = quantity * currentPrice;
        totalValue += stockValue;
        totalInvestment += quantity * purchasePrice;
        totalQuantity += quantity;
        totalPurchaseValue += quantity * purchasePrice;
  
        return stockValue;
      });
  
      const portfolioReturn = totalValue - totalInvestment;
      const avgPurchasePrice = totalPurchaseValue / totalQuantity || 0; // Handle division by zero
  
      setPortfolioMetrics({
        totalValue,
        totalInvestment,
        portfolioReturn,
        avgPurchasePrice,
      });
  
      setCurrentValue(stockCurrentValues.filter((value) => typeof value === 'number' && !isNaN(value))); // Ensure only valid numbers
    };
  
    // Update chart data when currentValue or stocks change
    useEffect(() => {
      if (currentValue.length > 0 && stocks.length > 0) {
        const totalPortfolioValue = portfolioMetrics.totalValue;
        const seriesData = currentValue.map((value) => ((value / totalPortfolioValue) * 100).toFixed(2));
        const labelsData = stocks.map((stock) => stock.symbol || 'Unknown');
        setChartData({
          series: seriesData,
          labels: labelsData,
        });
      }
    }, [currentValue, stocks, portfolioMetrics.totalValue]);
  
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-2 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree/>
        <Metrics metrics={portfolioMetrics} />
      <RadialChart
        chartData={chartData.series}
        portfolioValue={portfolioMetrics.totalValue}
        labels={labels}
      />
      </div>
    </>
  );
};

export default ECommerce;
