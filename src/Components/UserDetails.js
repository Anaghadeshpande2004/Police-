import React from 'react';
import TodayDetails from './TodayDetails';
import UserDetails from './UserDetails';
import CheckInHistory from './CheckInHistory';
import OccupancyDetails from './OccupancyDetails';

const Dashboard = () => {
  return (
    <div style={styles.dashboardContainer}>
      {/* Left Section */}
      <div style={styles.section}>
        <TodayDetails />
        <CheckInHistory />
      </div>

      {/* Right Section */}
      <div style={styles.section}>
        <UserDetails />
        <OccupancyDetails />
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two equal columns
    gap: '20px',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  section: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default Dashboard;
