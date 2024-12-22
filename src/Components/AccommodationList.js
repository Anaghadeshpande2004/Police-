import React, { useState, useEffect } from 'react';
import '../Styles/Accommodation.css';

function AccommodationList() {
  const [activeAccommodations, setActiveAccommodations] = useState([]);
  const [inactiveAccommodations, setInactiveAccommodations] = useState([]);
  const [viewingActive, setViewingActive] = useState(true); // Default view: Active accommodations

  useEffect(() => {
    // Fetch the accommodations based on active or inactive state
    fetchAccommodations(viewingActive);
  }, [viewingActive]);

  const fetchAccommodations = async (isActive) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/accommodations?status=${isActive ? 'active' : 'inactive'}`
      );
      const data = await response.json();
      console.log('Fetched data:', data); // Debug log
      if (isActive) {
        setActiveAccommodations(data);
      } else {
        setInactiveAccommodations(data);
      }
    } catch (error) {
      console.error('Error fetching accommodation data:', error);
    }
  };

  return (
    <div>
      <div className="button-container">
        <button
          onClick={() => setViewingActive(true)}
          className={`status-button ${viewingActive ? 'active' : ''}`}
        >
          Active Accommodations
        </button>
        <button
          onClick={() => setViewingActive(false)}
          className={`status-button ${!viewingActive ? 'inactive' : ''}`}
        >
          Inactive Accommodations
        </button>
      </div>

      <div className="detailed-breakdown">
        <table>
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Accommodation Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(viewingActive ? activeAccommodations : inactiveAccommodations).map((acc, index) => (
              <tr key={index}>
                <td>{acc.hotelName}</td>
                <td>{acc.type}</td>
                <td>{acc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccommodationList;
