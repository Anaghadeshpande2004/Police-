import React, { useEffect, useState } from "react";
import axios from 'axios';

const styles = {
  mainContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 'auto',
    
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
  },
  accommodationTableHeader: {
    backgroundColor: '#007bff', // Blue background for header
    color: '#fff', // White text color
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  accommodationTableCell: {
    border: '1px solid #ddd', // Light border
    padding: '10px',
    textAlign: 'left',
  },
  oddRow: {
    backgroundColor: '#f9f9f9', // Light grey for odd rows
  },
  evenRow: {
    backgroundColor: '#e0f7fa', // Light cyan for even rows
  },
  tableRowHover: {
    backgroundColor: '#f1f1f1', // Slightly darker gray for hover effect
  },
};

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
            {accommodations.map((hotel, index) => (
              <tr
                key={hotel.hotel_id}
                style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#e0f7fa' : '#f9f9f9')}
              >
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

export default AccommodationOverview;
