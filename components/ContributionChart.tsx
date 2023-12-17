import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
     contribution: any;
}
const BarChart: React.FC<BarChartProps> = ({contribution}) => {
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Contributions",
        data: Object.values(contribution),
        backgroundColor: [
          "rgb(255, 99, 132, 0.2)",
          "rgb(255, 159, 64, 0.2)",
          "rgb(255, 205, 86, 0.2)",
          "rgb(75, 192, 192, 0.2)",
          "rgb(54, 162, 235, 0.2)",
          "rgb(153, 102, 255, 0.2)",
          "rgb(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <div className="w-auto min-h-[50vh] p-4 o">
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Monthly Contributions",
              },
            },
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </>
  );
};

export default BarChart;
