import React, { useState, useEffect } from 'react';
import '../Styles/Accommodation.css';
import axios from 'axios';

function AccommodationOverview() {
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [accommodations, setAccommodations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccommodationCounts();
    fetchAccommodations();
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

  const fetchAccommodations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/accommodations');
      setAccommodations(response.data || []);
    } catch (err) {
      console.error('Error fetching accommodation data:', err);
      setError('Error fetching accommodation data.');
    }
  };

  return (
    <div className="main-container">
      <div className="overview">
        {error && <p className="error">{error}</p>}

        {/* Summary Section */}
        <div className="summary-section">
          <div className="summary-card active">
            <h3>Active Accommodations</h3>
            <p>{activeCount}</p>
          </div>
          <div className="summary-card inactive">
            <h3>Inactive Accommodations</h3>
            <p>{inactiveCount}</p>
          </div>
        </div>

        {/* Table Section */}
        <table className="accommodation-table">
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Active Accommodations</th>
              <th>Inactive Accommodations</th>
            </tr>
          </thead>
          <tbody>
            {accommodations.map((hotel) => (
              <tr key={hotel.hotel_id}>
                <td>{hotel.hotel_name}</td>
                <td>{hotel.active_rooms}</td>
                <td>{hotel.inactive_rooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccommodationOverview;
