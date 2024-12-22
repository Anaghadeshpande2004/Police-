import React from 'react';
import TodayDetails from './TodayDetails';
import UserDetails from './UserDetails';
import CheckInHistory from './CheckInHistory';
import OccupancyDetails from './OccupancyDetails';
import '../Styles/Dashboard.css';

const Dashboard = () => 
  {
  return (
    <div className="dashboard-container">
      {/* Left Section: Today's Details with Check-in History */}
      <div className="left-section">
        <TodayDetails />
        <CheckInHistory />
      </div>

      {/* Right Section: User Details */}
      <div className="right-section">
        <UserDetails />
        <OccupancyDetails />
      </div>
    </div>
  );
};

export default Dashboard;
