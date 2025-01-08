import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckIn = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSearch = async () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please enter both dates.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/check-in-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: checkInDate,
        endDate: checkOutDate,
      }),
    });

    const data = await response.json();
    setHistory(data);
  };

  return (
    <div>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}></h1>
        <button 
          style={styles.logoutButton} 
          onClick={() => navigate('/checkin2')} // Navigate to /checkin2 on click
        >
          All Check In Details
        </button>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        <h2>Check In History</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Check In Date</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Check Out Date</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleSearch} style={styles.button}>Search</button>

        {history.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Customer Name</th>
                <th>Check In Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.hotel_name}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.check_in_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
  },
  headerTitle: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#1a237e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse',
  },
};

export default CheckIn;
