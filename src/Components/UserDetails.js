import React from 'react';
import '../Styles/UserDetails.css';

const UserDetails = () => {
  const users = [
    { name: 'Vrinda', status: 'Inactive' },
    { name: 'Ravi', status: 'Active' },
    { name: 'Harsha', status: 'Active' },
  ];

  return (
    <div className="user-details-container">
      <div className="header">
        <h2>User Details</h2>
      </div>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} className="user-item">
            {user.name} -{' '}
            <span
              className={
                user.status === 'Active'
                  ? 'status-active'
                  : 'status-inactive'
              }
            >
              {user.status}
            </span>
          </li>
        ))}
      </ul>
      <button className="details-button">View Details</button>
    </div>
  );
};

export default UserDetails;
