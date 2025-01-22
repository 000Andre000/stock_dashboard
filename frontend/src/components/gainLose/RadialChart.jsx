import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialChart = ({ chartData, portfolioValue, labels }) => {
  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5 shadow-blue-300/70">
      <div className="mb-3 justify-center *gap-4 sm:flex">
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">Investment Analysis</h2>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          {chartData.length > 0 && (
            <ReactApexChart
              type="radialBar"
              series={chartData}
              options={{
                chart: {
                  type: 'radialBar',
                },
                colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
                labels: labels,
                plotOptions: {
                  radialBar: {
                    startAngle: 45,
                    endAngle: 720,
                    hollow: {
                      size: '10%',
                    },
                    dataLabels: {
                      name: {
                        show: true,
                        fontSize: '16px', // Label font size
                        fontWeight: 'bold', // Bold labels
                        offsetY: -110, // Move label vertically
                      },
                      value: {
                        show: true,
                        fontSize: '14px',
                        offsetY: -90, // Move value vertically
                      },
                      total: {
                        show: true,
                        label: 'Invested Amount',
                        formatter: () => `$${portfolioValue.toFixed(2)}`,
                      },
                    },
                  },
                },
              }}
              height={350}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RadialChart;
