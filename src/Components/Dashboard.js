// Dashboard.js
import React, { useEffect, useState } from 'react';
import TodayDetails from './TodayDetails';
import UserDetails from './UserDetails';
import CheckInHistory from './CheckInHistory';
import OccupancyDetails from './OccupancyDetails';
import axios from 'axios';

const Dashboard = () => {
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccommodationCounts();
  }, []);

  const fetchAccommodationCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/accommodations/counts');
      setActiveCount(response.data.active || 0);
      setInactiveCount(response.data.inactive || 0);
    } catch (error) {
      console.error('Error fetching accommodation counts:', error);
      setError('Error fetching accommodation counts.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <div style={styles.card}>
          <TodayDetails />
        </div>
        
        <div style={styles.card}>
          <UserDetails />
        </div>
        
        <div style={styles.card}>
          <CheckInHistory />
        </div>
        
        <div style={styles.card}>
          <OccupancyDetails 
            activeCount={activeCount} 
            inactiveCount={inactiveCount} 
          />
        </div>
      </div>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    width: '98%',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '16px',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '10px 0',
  },
};

export default Dashboard;