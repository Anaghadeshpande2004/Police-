import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Correct imports
import '../Styles/styles.css';  // If styles.css is in the 'src/css' folder

// Registering Chart.js components globally
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement, // For Bar chart
  Title,
  Tooltip,
  Legend
);

const TodayDetails = () => {
  // Data for the bar chart
  const data = {
    labels: ['Ananth Hotel', 'Oaks Hotel', 'Denissons Hotel', 'President Hotel'],
    datasets: [
      {
        label: 'Inactive Accommodation',
        data: [20, 15, 25, 10],
        backgroundColor: '#a2d2ff', // Light blue
      },
      {
        label: 'Active Accommodation',
        data: [40, 30, 35, 45],
        backgroundColor: '#0056d6', // Dark blue
      },
    ],
  };

  // Chart configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="todays-details">
      <h3>Today's Details</h3>
      
      {/* Chart container */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      
      {/* View Details button */}
      <button className="details-button">View Details</button>
    </div>
  );
};

export default TodayDetails;
