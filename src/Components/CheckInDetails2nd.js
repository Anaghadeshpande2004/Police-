import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";



const CheckInDetails2nd = () => {
  const { state } = useLocation();
  const { fromDate, toDate } = state || {};
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fromDate || !toDate) {
      setError("No date range provided.");
      return;
    }

    fetch(`/api/customers?fromDate=${fromDate}&toDate=${toDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setError("No customers found for the selected dates.");
        } else {
          setCustomers(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load customer data.");
      });
  }, [fromDate, toDate]);

  const handleViewDetails = (customer) => {
    navigate("/checkindetails3", { state: { customer } });
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.heading}>Customer List</h2>
        {error && <p style={styles.error}>{error}</p>}
        {customers.length === 0 ? (
          <p>No customers found for the selected dates.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Hotel</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Check-In Time</th>
                <th style={styles.th}>Check-In Date</th>
                <th style={styles.th}>Check-Out Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.CustomerID} style={styles.tr}>
                  <td>{customer.HotelName}</td>
                  <td>{customer.Name}</td>
                  <td>{customer.CheckInTime}</td>
                  <td>{customer.CheckInDate}</td>
                  <td>{customer.CheckOutDate}</td>
                  <td>
                    <button
                      onClick={() => handleViewDetails(customer)}
                      style={styles.button}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default CheckInDetails2nd;
