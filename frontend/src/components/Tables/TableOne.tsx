import { Edit, Delete } from "@mui/icons-material";
import{IconButton } from "@mui/material";

const TableOne = ({ name, stocks = [],onEdit, onDelete }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {name}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Stock Name
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

        {stocks.length === 0 ? (
          <div className="p-5 text-center">No stocks available</div>
        ) : (
          stocks.map((stock, key) => (
            <div
              className={`grid grid-cols-6 sm:grid-cols-6 ${key === stocks.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
                }`}
              key={stock.id || key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {stock.name || 'N/A'}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{stock.ticker || 'N/A'}</p>
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
              <IconButton onClick={() => onEdit(stock.id)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(stock.id)}>
                <Delete />
              </IconButton>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TableOne;
