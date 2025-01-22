import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

interface ChartThreeState {
  series: number[];
  labels: string[];
}

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [],
    labels: [],
  });

  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
    labels: [],
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  });

  // Fetch stock data from backend
  useEffect(() => {
    axios
      .get('https://stocks-dashboard.up.railway.app/api/stocks')
      .then((response) => {
        const stockData = response.data.stocks;

        // Extract quantities and stock names
        const seriesData = stockData.map((stock: any) => stock.quantity);
        const labelsData = stockData.map((stock: any) => stock.name);

        setState({
          series: seriesData,
          labels: labelsData,
        });

        // Update chart options with fetched labels
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          labels: labelsData,
        }));
      })
      .catch((error) => {
        console.error('There was an error fetching the stocks!', error);
      });
  }, []);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5 shadow-blue-300/70">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Holdings Breakup
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {state.labels.map((label, index) => (
          <div key={index} className="sm:w-1/2 w-full px-8">
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-full max-w-3 rounded-full"
                style={{ backgroundColor: chartOptions.colors?.[index] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{label}</span>
                <span>{state.series[index]}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
