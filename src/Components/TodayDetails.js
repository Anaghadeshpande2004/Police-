import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

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
    <div style={styles.todaysDetailsContainer}>
      <div style={styles.todaysDetails}>
        <h3>Today's Details</h3>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.chartContainer}>
          <Bar data={data} options={options} />
        </div>
        <button style={styles.detailsButton} onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

const styles = {
  todaysDetailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px',
    width: '100%',
  },
  todaysDetails: {
    width: '650px',
    margin: 0,
    padding: '30px 10px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  chartContainer: {
    width: '500px',
    maxHeight: '400px',
    marginBottom: '30px',
  },
  detailsButton: {
    marginTop: '20px',
    backgroundColor: '#0056d6',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
    alignSelf: 'center',
    
    
  },
  
  detailsButtonHover: {
    backgroundColor: '#003e9f',
  },
  error: {
    color: '#ff0000',
    fontWeight: 'bold',
    marginTop: '20px',
  },
};

export default TodayDetails;
