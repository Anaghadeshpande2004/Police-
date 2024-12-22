import React from "react";
import { Line } from "react-chartjs-2";
import '../Styles/CheckInHistory.css'; 
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

// Register required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip);

const CheckInHistory = () => {
  const data = {
    labels: ["March", "April", "May", "June", "July", "August", "September"],
    datasets: [
      {
        label: "Check-ins",
        data: [300, 400, 500, 750, 600, 650, 580],
        borderColor: "blue",
        borderWidth: 2,
        pointBackgroundColor: "blue",
        tension: 0.4, // Smooth curve effect
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the dataset label
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Check-in History</h2>
      <Line data={data} options={options} />
      <button className="view-details-btn">View Details</button>
    </div>
  );
};

export default CheckInHistory;
