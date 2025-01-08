import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const OccupancyDetails = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook to navigate to another route

  // Fetch accommodations data from the API
  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/accommodations');
      setAccommodations(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching accommodation data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate occupancy data
  const calculateOccupancyData = () => {
    let activeRooms = 0;
    let inactiveRooms = 0;

    accommodations.forEach((hotel) => {
      activeRooms += hotel.active_rooms;
      inactiveRooms += hotel.inactive_rooms;
    });

    return [inactiveRooms, activeRooms]; // Return data for Pie chart (Inactive, Active)
  };

  // Pie chart data
  const data = {
    labels: ['Inactive Accommodation', 'Active Accommodation'],
    datasets: [
      {
        data: calculateOccupancyData(),
        backgroundColor: ['#FFA500', '#00008B'], // Colors for segments
        hoverBackgroundColor: ['#FFC04D', '#2A2A8F'], // Colors on hover
      },
    ],
  };

  // Pie chart options
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

  // Navigate to the accommodation details page
  const handleViewDetails = () => {
    navigate('/accommodation'); // Adjust this path as needed
  };

  return (
    <div className="occupancy-details-container">
      <div className="occupancy-header">
        <h3>Total Occupancy Details</h3>
        <button className="view-details-btn" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
      <div className="occupancy-chart">
        {loading && <p>Loading occupancy details...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && accommodations.length === 0 && !error && (
          <p>No accommodations available at the moment.</p>
        )}
        {!loading && accommodations.length > 0 && (
          <Pie data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default OccupancyDetails;

const styles = `
  .occupancy-details-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    height : 400px;
    border: '1px solid #ddd';
  }

  .occupancy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .occupancy-header h3 {
    font-size: 18px;
    color: #00008b;
    margin: 0;
  }

  .view-details-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }

  .view-details-btn:hover {
    background-color: #0056b3;
  }

  .occupancy-chart {
    height: 300px; /* Ensure chart height is responsive */
    width: 100%;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
