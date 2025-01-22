import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";  // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";  // Import the toastify CSS
import './stockform.css'

const StockForm = ({initialData = {} }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTickerData, setSelectedTickerData] = useState(null);
  const [formData, setFormData] = useState({
        name: initialData.name || "",
        ticker: initialData.ticker || "",
        quantity: initialData.quantity || 1,
        buyPrice: initialData.buyPrice || "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Send the form data to the backend via a POST request
        axios
          .post("https://stocks-dashboard.up.railway.app/api/stocks", formData)  // Adjust the URL if necessary
          .then((response) => {
            console.log("Stock added successfully:", response.data);
            toast.success("Stock added successfully!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            // onSubmit(formData);  // Optionally, call onSubmit to notify parent component
            setFormData({ name: "", ticker: "", quantity: 1, buyPrice: "" });  // Reset the form
    
            // Show success notification
           
          })
          .catch((err) => {
            console.error("Error adding stock:", err);
            // Show error notification
            toast.error("Failed to add stock. Please try again.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          });
      };
    
     


  const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY; // Replace with your Finnhub API key

  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/search`,
        {
          params: {
            q: searchQuery,
            token: API_KEY,
          },
        }
      );
      const data = response.data;
      if (data.result) {
        setSuggestions(data.result);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setError('Error fetching data.');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTickerData = async (symbol) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote`,
        {
          params: {
            symbol,
            token: API_KEY,
          },
        }
      );
      const data = response.data;
      if (data) {
        const tickerData = {
          symbol,
          current: data.c,
          high: data.h,
          low: data.l,
          open: data.o,
          previousClose: data.pc,
          description: data.description,
        };
        setSelectedTickerData(tickerData);
        return tickerData; // Return data for further processing
      } else {
        setSelectedTickerData(null);
        setError("No data available for the selected ticker.");
        return {};
      }
    } catch (err) {
      setError("Error fetching ticker data.");
      setSelectedTickerData(null);
      throw err; // Re-throw the error to handle it in `handleSuggestionClick`
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value); // Fetch suggestions as user types
  };

  const handleSuggestionClick = async (symbol, description) => {
    console.log("Selected Symbol:", symbol);
    setQuery(symbol);
    setSuggestions([]); // Clear suggestions
  
    try {
      const data = await fetchTickerData(symbol); // Wait for ticker data to load
      setFormData((prev) => ({
        ...prev,
        ticker: symbol, // Set the ticker symbol
        buyPrice: data.current || "", // Set the current price as buyPrice
        name: description || "", // Set the description from the suggestion as the name
      }));
    } catch (err) {
      console.error("Error fetching ticker data for autofill:", err);
    }
  };
  
  

  return (
    <>
    
<div className="flex justify-center items-center mx-auto" style={{ maxWidth: '800px', position: 'relative' }}>
  <div>
    <div className="">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a stock or symbol..."
        className="border rounded-xl p-[10px] w-[600px] z-[200] relative dark:bg-[#1c2434] dark:text-whiten "
      />
    </div>

  
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {suggestions.length > 0 && (
      <ul
        className="-mt-5 pt-5 mb-5 list-none styled-scrollbar border rounded-xl absolute w-[600px] bg-white dark:border-strokedark dark:bg-boxdark"
        style={{
          maxHeight: '150px',
          overflowY: 'auto',
          zIndex: '100', // Make sure the suggestions list is behind the input field
        }}
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion.symbol, suggestion.description)}
            className="p-[10px] cursor-pointer border-b border-b-[#ddd]"
          >
            <strong>{suggestion.symbol}</strong> - {suggestion.description}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
    <Box component="form" onSubmit={handleSubmit} className="rounded-xl border border-stroke bg-white px-5 mt-5 pt-6 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1" sx={{ maxWidth: 400, mx: "auto" }}>
    
  <TextField
    label="Stock Name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    fullWidth
    margin="normal"
    required
    focused
    slotProps={{
      input: {
        className: "dark:text-white", // Custom styling for input field
      },
      inputLabel: {
        className: "dark:text-white", // Custom styling for label
      },
    }}
  />
  <TextField
    label="Ticker Symbol"
    name="ticker"
    value={formData.ticker}
    onChange={handleChange}
    fullWidth
    margin="normal"
    required
    focused
    defaultValue="Ticker Symbol"
    slotProps={{
      input: {
        className: "dark:text-white ", // Custom styling for input field
      },
      inputAdornment:{
        className:"dark:bg-white",
      },
      inputLabel: {
        className: "dark:text-white", // Custom styling for label
      },
    }}
  />
  
  <TextField
    label="Quantity"
    name="quantity"
    type="number"
    value={formData.quantity}
    onChange={handleChange}
    fullWidth
    margin="normal"
    required
    focused
    slotProps={{
      input: {
        className: "dark:text-white ", // Custom styling for input field
      },
      inputLabel: {
        className: "dark:text-white", // Custom styling for label
      },
    }}
  />
  <TextField
    label="Buy Price"
    name="buyPrice"
    type="number"
    value={formData.buyPrice}
    onChange={handleChange}
    fullWidth
    margin="normal"
    required
    focused
    slotProps={{
      input: {
        className: "dark:text-white", // Custom styling for input field
      },
      inputLabel: {
        className: "dark:text-white", // Custom styling for label
      },
    }}
  />
  <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 ,mb:4}}>
    Submit
  </Button>
</Box>


      {/* Toastify Container */}
      <ToastContainer />

    </>
  );
};

export default StockForm;
