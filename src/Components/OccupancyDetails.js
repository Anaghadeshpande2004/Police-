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
import '../Styles/OccupancyDetails.css'; // Import CSS

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
