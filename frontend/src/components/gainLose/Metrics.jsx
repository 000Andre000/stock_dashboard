import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Metrics = ({ metrics }) => {
  const series = [
    {
      name: 'Portfolio Metrics',
      data: [
        metrics.totalValue,
        metrics.totalInvestment,
        metrics.portfolioReturn,
        metrics.avgPurchasePrice,
      ],
    },
  ];

  const options = {
    chart: {
      type: 'radar',
    },
    labels: ['Total Value', 'Total Investment', 'Portfolio Return', 'Avg Purchase Price'],
    fill: {
      opacity: 0.2,
    },
    stroke: {
      width: 2,
    },
    markers: {
      size: 3,
    },
    yaxis: {
      show: false,
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: '#e8e8e8',
          connectorColors: '#e8e8e8',
        },
      },
    },
    theme: {
      palette: 'palette1', // Customize this as needed
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '16px', // Increase label font size
          fontWeight: 'bold', // Make labels bold
        },
      },
    },
    legend: {
      position: 'bottom',
    },
    
  };

  return (
    <div className="sm:px-2 col-span-12 rounded-sm border border-stroke bg-white px-2 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7 shadow-blue-300/70">
      <div className="mb-3 justify-center sm:flex">
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Metric Analysis
          </h2>
        </div>
      </div>

      <div className="mb-2 ml-6">
        <div id="chartRadar" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="radar" height={400} width={600}/>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
