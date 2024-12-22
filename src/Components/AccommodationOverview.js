import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../Styles/Accommodation.css';

function AccommodationOverview() {
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    // Fetch accommodation data from backend
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/accommodations/counts');
      const data = await response.json();
      setActiveCount(data.active);
      setInactiveCount(data.inactive);
    } catch (error) {
      console.error('Error fetching accommodation data:', error);
    }
  };

  return (
    <div className="overview">
      <div className="summary-card active">
        <h3>Active Accommodations</h3>
        <p>{activeCount}</p>
      </div>
      <div className="summary-card inactive">
        <h3>Inactive Accommodations</h3>
        <p>{inactiveCount}</p>
      </div>
    </div>
  );
}

export default AccommodationOverview;
