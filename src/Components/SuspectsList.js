import React, { useState, useEffect } from 'react';
import '../Styles/SuspectList.css';

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

  return (
    <div className="suspects-list-container">
      

      {error && <p className="error-message">Error: {error}</p>}

      {suspects.length > 0 ? (
        <table className="suspects-table">
          <thead>
            <tr>
              <th>Suspect ID</th>
               <th>Name</th>
              <th>Identity Proof</th>
              <th>ID Number</th>
              <th>Vehicle Number</th>
              <th>File Upload</th>
            </tr>
          </thead>
          <tbody>
            {suspects.map((suspect) => (
              <tr key={suspect.suspect_id}>
                <td>{suspect.suspect_id}</td>
                <td>{suspect.name}</td>
                <td>{suspect.identity_proof}</td>
                <td>{suspect.id_number}</td>
                <td>{suspect.vehicle_number}</td>
                <td>
                  {suspect.file_upload ? (
                    <a href={`http://localhost:5000/uploads/${suspect.file_upload}`} target="_blank" rel="noopener noreferrer">
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
