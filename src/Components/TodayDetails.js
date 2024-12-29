import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../Styles/styles.css';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TodayDetails = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/accommodations');
      setAccommodations(response.data);
    } catch (err) {
      setError('Error fetching accommodation data');
      console.error(err);
    }
  };

  const labels = accommodations.map((hotel) => hotel.hotel_name);
  const activeData = accommodations.map((hotel) => hotel.active_rooms);
  const inactiveData = accommodations.map((hotel) => hotel.inactive_rooms);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Inactive Accommodation',
        data: inactiveData,
        backgroundColor: '#a2d2ff',
      },
      {
        label: 'Active Accommodation',
        data: activeData,
        backgroundColor: '#0056d6',
      },
    ],
  };

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

  const handleViewDetails = () => {
    navigate('/accommodation');
  };

  return (
    <div className="todays-details-container">
      <div className="todays-details">
        <h3>Today's Details</h3>
        {error && <p className="error">{error}</p>}
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
        <button className="details-button" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default TodayDetails;
