import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const navigate = useNavigate(); // Hook for navigation

  const users = [
    { name: 'Vrinda', status: 'Inactive' },
    { name: 'Ravi', status: 'Active' },
    { name: 'Harsha', status: 'Active' },
  ];

  // Update this function to navigate to CheckInDetails2nd.js
  const handleViewDetails = () => {
    navigate('/checkin2'); // Navigate to CheckInDetails2nd.js page
  };

  return (
    <div style={styles.userDetailsContainer}>
      <div style={styles.header}>
        <h2>User Details</h2>
      </div>
      <ul style={styles.userList}>
        {users.map((user, index) => (
          <li key={index} style={styles.userItem}>
            {user.name} -{' '}
            <span
              style={
                user.status === 'Active'
                  ? styles.statusActive
                  : styles.statusInactive
              }
            >
              {user.status}
            </span>
          </li>
        ))}
      </ul>
      <button style={styles.detailsButton} onClick={handleViewDetails}>View Details</button>
    </div>
  );
};

// Styles remain unchanged
const styles = {
  userDetailsContainer: {
    width: '700px',
    background: '#fff',
    padding: '20px',
    margin: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '420px',
    border: '1px solid #ddd',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '20px',
  },
  userList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  userItem: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  statusActive: {
    color: 'green',
    fontWeight: 'bold',
  },
  statusInactive: {
    color: 'red',
    fontWeight: 'bold',
  },
  detailsButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  },
};

export default UserDetails;