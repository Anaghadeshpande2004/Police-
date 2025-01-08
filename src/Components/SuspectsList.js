import React, { useState, useEffect } from 'react';

const SuspectsList = () => {
  const [suspects, setSuspects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/suspect')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSuspects(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const styles = {
    suspectsListContainer: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'start',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '20px',
    },
    suspectsTable: {
      width: '90%',
      borderCollapse: 'collapse',
      margin: '20px 0',
      backgroundColor: '#fff',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    tableThTd: {
      padding: '12px 15px',
      textAlign: 'left',
      border: '1px solid #ddd',
    },
    tableTh: {
      backgroundColor: '#294ed4',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '16px 15px', // Increase padding for more height
    height: '50px', // Set a minimum height
    verticalAlign: 'middle', // Ensure content is centered vertically
      
    },
    tableRowEven: {
      backgroundColor: '#f2f2f2',
    },
    tableRowHover: {
      backgroundColor: '#f1f1f1',
      cursor: 'pointer',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    errorMessage: {
      color: '#ff0000',
      fontWeight: 'bold',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.suspectsListContainer}>
    

      {error && <p style={styles.errorMessage}>Error: {error}</p>}

      {suspects.length > 0 ? (
        <table style={styles.suspectsTable}>
          <thead>
            <tr>
              <th style={styles.tableTh}>Suspect ID</th>
              <th style={styles.tableTh}>Name</th>
              <th style={styles.tableTh}>Identity Proof</th>
              <th style={styles.tableTh}>ID Number</th>
              <th style={styles.tableTh}>Vehicle Number</th>
              <th style={styles.tableTh}>File Upload</th>
            </tr>
          </thead>
          <tbody>
            {suspects.map((suspect, index) => (
              <tr
                key={suspect.suspect_id}
                style={
                  index % 2 === 0
                    ? styles.tableRowEven
                    : {}
                }
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.tableRowHover.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? styles.tableRowEven.backgroundColor : '')
                }
              >
                <td style={styles.tableThTd}>{suspect.suspect_id}</td>
                <td style={styles.tableThTd}>{suspect.name}</td>
                <td style={styles.tableThTd}>{suspect.identity_proof}</td>
                <td style={styles.tableThTd}>{suspect.id_number}</td>
                <td style={styles.tableThTd}>{suspect.vehicle_number}</td>
                <td style={styles.tableThTd}>
                  {suspect.file_upload ? (
                    <a
                      href={`http://localhost:5000/uploads/${suspect.file_upload}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration =
                          styles.linkHover.textDecoration)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = 'none')
                      }
                    >
                      View File
                    </a>
                  ) : (
                    'No File'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No suspects found.</p>
      )}
    </div>
  );
};

export default SuspectsList;
