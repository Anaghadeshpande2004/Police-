import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccommodationOverview = () => {
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
    <div style={styles.mainContainer}>
      <div style={styles.overview}>
        {error && <p style={styles.error}>{error}</p>}

        {/* Summary Section */}
        <div style={styles.summarySection}>
          <div style={{ ...styles.summaryCard, backgroundColor: '#4caf50' }}>
            <h3>Active Accommodations</h3>
            <p>{activeCount}</p>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: '#f44336' }}>
            <h3>Inactive Accommodations</h3>
            <p>{inactiveCount}</p>
          </div>
        </div>

        {/* Table Section */}
        <table style={styles.accommodationTable}>
          <thead>
            <tr>
              <th style={styles.accommodationTableHeader}>Hotel Name</th>
              <th style={styles.accommodationTableHeader}>Active Accommodations</th>
              <th style={styles.accommodationTableHeader}>Inactive Accommodations</th>
            </tr>
          </thead>
          <tbody>
            {accommodations.map((hotel) => (
              <tr key={hotel.hotel_id}>
                <td style={styles.accommodationTableCell}>{hotel.hotel_name}</td>
                <td style={styles.accommodationTableCell}>{hotel.active_rooms}</td>
                <td style={styles.accommodationTableCell}>{hotel.inactive_rooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '400px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  overview: {
    width: '90%',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(159, 80, 80, 0.1)',
    borderRadius: '8px',
    padding: '20px',
  },
  summarySection: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 0',
  },
  summaryCard: {
    width: '45%',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#fff',
  },
  accommodationTable: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    border: '1px solid black', // Table border
  },
  accommodationTableHeader: {
    backgroundColor: '#f2f2f2',
    border: '1px solid black',
    padding: '10px',
    textAlign: 'left',
  },
  accommodationTableCell: {
    border: '1px solid black',
    padding: '10px',
    textAlign: 'left',
  },
};

export default AccommodationOverview;
