import React from 'react';
import TodayDetails from './TodayDetails';
import UserDetails from './UserDetails';
import CheckInHistory from './CheckInHistory';
import OccupancyDetails from './OccupancyDetails';

const Dashboard = () => {
  return (
    <div style={styles.dashboardContainer}>
      {/* Left Section: Today's Details with Check-in History */}
      <div style={styles.leftSection}>
        <TodayDetails />
        <CheckInHistory />
      </div>

      {/* Right Section: User Details */}
      <div style={styles.rightSection}>
        <UserDetails />
        <OccupancyDetails />
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    padding: '20px',
    maxWidth: '1200px',
    width: '100%',
    margin: '15px', // Center the container horizontally
    boxSizing: 'border-box', // Ensure padding is included within width
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  '@media (max-width: 768px)': {
    dashboardContainer: {
      flexDirection: 'column',
      gap: '20px',
    },
  },
};

export default Dashboard;
