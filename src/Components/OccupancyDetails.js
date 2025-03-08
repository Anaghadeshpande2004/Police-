import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const OccupancyDetails = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

  const calculateOccupancyData = () => {
    let activeRooms = 0;
    let inactiveRooms = 0;

    accommodations.forEach((hotel) => {
      activeRooms += hotel.active_rooms;
      inactiveRooms += hotel.inactive_rooms;
    });

    return [inactiveRooms, activeRooms];
  };

  const data = {
    labels: ['Inactive Accommodation', 'Active Accommodation'],
    datasets: [
      {
        data: calculateOccupancyData(),
        backgroundColor: ['#FFA500', '#00008B'],
        hoverBackgroundColor: ['#FFC04D', '#2A2A8F'],
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
          usePointStyle: true,
        },
      },
    },
  };

  const handleViewDetails = () => {
    navigate('/accommodation');
  };

  return (
    <div style={styles.occupancyDetailsContainer}>
      <div style={styles.occupancyDetails}>
        <h3>Total Occupancy Details</h3>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.chartContainer}>
          {loading && <p>Loading occupancy details...</p>}
          {!loading && accommodations.length === 0 && !error && (
            <p>No accommodations available at the moment.</p>
          )}
          {!loading && accommodations.length > 0 && <Pie data={data} options={options} />}
        </div>
        <button style={styles.detailsButton} onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};



const styles = {
  occupancyDetailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px',
    width: '100%',
  },
  occupancyDetails: {
    width: '680px',
    margin: '10px',
    padding: '30px 30px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '8000px'
  },
  chartContainer: {
    width: '500px',
    maxHeight: '400px',
    marginBottom: '30px',
  },
  detailsButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
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

export default OccupancyDetails;
