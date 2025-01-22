// import StockTable from './Stocktable/Stocktable';
// import StockList from './showStock/StockList';
import React, { useState, useEffect } from "react";
import axios from "axios";

import TableOne from './Tables/TableOne';


const Portfolio = () => {

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
 const onEdit = (stock) => {
  const updatedStock = { ...stock, name: "Updated Stock" }; // For example, updating the name
  axios
    .put(`https://stocks-dashboard.up.railway.app/api/stocks/${stock.id}`, updatedStock)
    .then((response) => {
      setStocks(stocks.stocks.map((s) => (s.id === stock.id ? response.data : s)));
    })
    .catch((error) => {
      console.error("Error updating stock:", error);
    });
};

// Handle deleting a stock
const onDelete = (id) => {
  axios
    .delete(`https://stocks-dashboard.up.railway.app/api/stocks/${id}`)
    .then(() => {
      setStocks(stocks.stocks.filter((stock) => stock.id !== id));
    })
    .catch((error) => {
      console.error("Error deleting stock:", error);
    });
};

  return (
    <div>
      {/* <StockList/> */}
      {/* <StockTable stocks={stocks} onEdit={handleEdit} onDelete={handleDelete} /> */}
      {console.log(stocks.stocks)}
      <TableOne name="Hello" stocks={stocks.stocks} />
      
    </div>
  );
};

export default Portfolio;
