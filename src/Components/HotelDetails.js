import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Accommodation.css';

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
    </div>
  );
}

export default HotelDetails;
