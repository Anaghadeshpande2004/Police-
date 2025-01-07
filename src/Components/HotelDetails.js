import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function HotelDetails() {
  const { hotelId } = useParams();
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hotel-details/${hotelId}`);
      setDetails(response.data);
    } catch (err) {
      setError('Error fetching hotel details');
      console.error(err);
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Hotel Details</h1>
      </header>

      {error && <p className="error">{error}</p>}
      <table className="details-table">
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Hotel ID</th>
            <th>Room ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.room_id}>
              <td>{detail.hotel_name}</td>
              <td>{detail.hotel_id}</td>
              <td>{detail.room_id}</td>
              <td>{detail.customer_id || 'N/A'}</td>
              <td>{detail.customer_name || 'N/A'}</td>
              <td>{detail.availability_status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        /* General Styles */
        .main-container {
          font-family: Arial, sans-serif;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
          height: 400px;
        }

        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .error {
          color: red;
          text-align: center;
          font-weight: bold;
          margin: 10px 0;
        }

        .loading,
        .no-data {
          text-align: center;
          font-size: 16px;
          color: #666;
        }

        /* Table Styles */
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border: 1px solid black; /* Ensure black border for the table */
        }

        .details-table th,
        .details-table td {
          padding: 12px 15px;
          text-align: left;
          border: 1px solid black; /* Ensure black border for th and td */
        }

        .details-table th {
          background-color: #294ed4; /* Blue header */
          color: white;
          text-transform: uppercase;
          font-size: 14px;
        }

        .details-table tr:nth-child(even) {
          background-color:rgb(231, 74, 74);
        }

        .details-table tr:hover {
          background-color: #f1f1f1;
          cursor: pointer;
        }

        .details-table td {
          color: #333;
          font-size: 14px;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .details-table th,
          .details-table td {
            padding: 8px 10px;
            font-size: 12px;
          }

          .main-container {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default HotelDetails;
