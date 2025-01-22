import React, { useState, useEffect } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton, Modal, TextField, Button } from "@mui/material";

const StockTable = ({ stocks = [], onEdit, onDelete }) => {
  const [open, setOpen] = useState(false); // Controls the modal visibility
  const [currentStock, setCurrentStock] = useState(null); // Stores the stock being edited
  const [newQuantity, setNewQuantity] = useState(""); // Stores the updated quantity
  const [st, setST] = useState(currentStock);

  const handleEditClick = (stock) => {
    setCurrentStock(stock);
    setNewQuantity(stock.quantity); // Pre-fill the current quantity
    setOpen(true);
  };

  const handleSave = () => {
    let sotc;
    if (currentStock && newQuantity) {
      sotc = currentStock;
      sotc.quantity = newQuantity;
      setST(sotc);
      onEdit(currentStock.id, sotc); 
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentStock(null);
    setNewQuantity("");
  };

  // Log whenever 'st' changes
  useEffect(() => {
    console.log("Updated stock:", st);
  }, [st]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 shadow-blue-300">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Portfolio
      </h4>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Ticker
            </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Quantity
            </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Buy Price
            </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Value
            </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {/* Table Body */}
        {stocks.length === 0 ? (
          <div className="p-5 text-center">No stocks available</div>
        ) : (
          stocks.map((stock, key) => (
            <div
              className={`grid grid-cols-6 sm:grid-cols-6 ${key === stocks.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
              }`}
              key={stock.id || key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {stock.name || "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{stock.ticker || "N/A"}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{stock.quantity || 0} shares</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">${stock.buyPrice || 0}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">
                  ${(Number(stock.buyPrice || 0) * Number(stock.quantity || 0)).toFixed(2)}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <IconButton onClick={() => handleEditClick(stock)}>
                  <Edit className="text-meta-3" />
                </IconButton>
                <IconButton onClick={() => onDelete(stock.id)}>
                  <Delete className="text-meta-5" />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h4 className="mb-4 text-lg font-semibold text-black">Edit Quantity</h4>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StockTable;
