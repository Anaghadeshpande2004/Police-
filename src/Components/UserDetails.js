import React from 'react';

const UserDetails = () => {
  const users = [
    { name: 'Vrinda', status: 'Inactive' },
    { name: 'Ravi', status: 'Active' },
    { name: 'Harsha', status: 'Active' },
  ];

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
      <button style={styles.detailsButton}>View Details</button>
    </div>
  );
};

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
  headerH2: {
    color: 'black',
    fontSize: '20px',
    margin: '0',
    padding: '0',
    backgroundColor: 'transparent',
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
  detailsButtonHover: {
    backgroundColor: '#0056b3',
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
};

export default UserDetails;
