import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import '../Styles/OccupancyDetails.css'; // Import CSS

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const OccupancyDetails = () => {
  const data = {
    labels: ['Inactive Accommodation', 'Active Accommodation'],
    datasets: [
      {
        data: [30, 70], // Adjust values as per your dataset
        backgroundColor: ['#FFA500', '#00008B'], // Colors for segments
        hoverBackgroundColor: ['#FFC04D', '#2A2A8F'], // Colors on hover
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
          usePointStyle: true, // Adds legend circles
        },
      },
    },
  };

  return (
    <div className="occupancy-details-container">
      <div className="occupancy-header">
        <h3>Total Occupancy Details</h3>
        <button className="view-details-btn">View Details</button>
      </div>
      <div className="occupancy-chart">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default OccupancyDetails;
