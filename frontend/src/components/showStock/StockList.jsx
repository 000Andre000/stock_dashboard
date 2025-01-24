import React, { useState, useEffect } from "react";
import axios from "axios";
import StockTable from '../Stocktable/Stocktable'; // Import your StockTable component
import Value from "../showValue/Value";

const StockList = () => {
    const [stocks, setStocks] = useState([]);


  // Fetch stocks from backend
  useEffect(() => {
    axios
      .get("https://stocks-dashboard.up.railway.app/api/stocks")
      .then((response) => {
        setStocks(response.data); // Set stocks data
      })
      .catch((error) => {
        console.error("There was an error fetching the stocks!", error);
      });
  }, []);

  // Handle editing a stock
  const handleEditStock = (id, stockToUpdate) => {
    console.log(stockToUpdate);
    axios
      .put(`https://stocks-dashboard.up.railway.app/api/stocks/${id}`, stockToUpdate) // Send stockToUpdate directly
      .then(() => {
        // Handle success
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  
  

  // Handle deleting a stock
  const onDelete = (id) => {
    axios
      .delete(`https://stocks-dashboard.up.railway.app/api/stocks/${id}`)
      .then(() => {
        setStocks(stocks.stocks.filter((stock) => stock.id !== id));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting stock:", error);
      });
  };

  return (
    <div>
      <Value portVal={stocks.portfolioValue}/>
      <StockTable stocks={stocks.stocks} onEdit={handleEditStock} onDelete={onDelete} />
    </div>
  );
};

export default StockList;
