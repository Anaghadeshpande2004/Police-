import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaDownload, FaUpload, FaTrashAlt, FaSort } from "react-icons/fa"; // Import FontAwesome icons
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autoTable plugin

function CheckInDetails2nd() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch data from the backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to format date to Indian Standard Time (IST) - Date only
  const formatDateToIST = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Inline CSS styles
  const styles = {
    tableContainer: {
      width: "80%",
      margin: "20px auto",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    thead: {
      backgroundColor: "#007bff",
      color: "white",
    },
    thTd: {
      padding: "12px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    hoverRow: {
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    viewBtn: {
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "4px",
      transition: "background-color 0.3s",
    },
    deleteBtn: {
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
      backgroundColor: "#ff4d4d",
      color: "white",
      borderRadius: "4px",
      transition: "background-color 0.3s",
    },
    deleteBtnHover: {
      backgroundColor: "#ff3333",
    },
    viewBtnHover: {
      backgroundColor: "#0056b3",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: "20px",
    },
    actionButton: {
      marginRight: "10px",
      padding: "10px 15px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: "4px",
      border: "1px solid #ddd",
      cursor: "pointer",
    },
    actionButtonHover: {
      backgroundColor: "#e1e1e1",
    },
    icon: {
      marginRight: "8px",
    },
  };

  const handleViewClick = (bookingId) => {
    navigate(`/viewdetails/${bookingId}`); // Navigate to CheckInDetails3rd with the booking ID
  };

  // Handle Delete button click (No deletion from database)
  const handleDeleteClick = (bookingId) => {
    if (window.confirm("Are you sure you want to remove this booking from the list?")) {
      // Remove the booking from the state (without affecting the database)
      setBookings(bookings.filter((booking) => booking.booking_id !== bookingId));
    }
  };

  // Handle Export button click
  const handleExportClick = () => {
    const doc = new jsPDF();

    doc.autoTable({
      head: [
        ["S.No", "Booking ID", "Customer ID", "Customer Name", "Check In Date", "Check Out Date"],
      ],
      body: bookings.map((booking, index) => [
        index + 1,
        booking.booking_id,
        booking.customer_id,
        booking.name,
        formatDateToIST(booking.check_in_date),
        formatDateToIST(booking.check_out_date),
      ]),
    });

    doc.save("bookings.pdf");
  };

  return (
    <div style={styles.tableContainer}>
      <div style={styles.buttonContainer}>
        <button
          style={styles.actionButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
          onClick={handleExportClick}
        >
          <FaDownload style={styles.icon} />
          Export
        </button>
        <button
          style={styles.actionButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
        >
          <FaUpload style={styles.icon} />
          Import
        </button>
        <button
          style={styles.actionButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
        >
          <FaTrashAlt style={styles.icon} />
          Delete
        </button>
        <button
          style={styles.actionButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
        >
          <FaSort style={styles.icon} />
          Sort by
        </button>
      </div>
          <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.thTd}>S.No</th>
            <th style={styles.thTd}>Booking ID</th>
            <th style={styles.thTd}>Customer ID</th>
            <th style={styles.thTd}>Customer Name</th>
            <th style={styles.thTd}>Check In Date</th>
            <th style={styles.thTd}>Check Out Date</th>
            <th style={styles.thTd}>View Details</th>
            <th style={styles.thTd}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.booking_id} // Use booking ID as the key
              style={styles.hoverRow}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <td style={styles.thTd}>{bookings.indexOf(booking) + 1}</td>
              <td style={styles.thTd}>{booking.booking_id}</td>
              <td style={styles.thTd}>{booking.customer_id}</td>
              <td style={styles.thTd}>{booking.name}</td>
              <td style={styles.thTd}>{formatDateToIST(booking.check_in_date)}</td>
              <td style={styles.thTd}>{formatDateToIST(booking.check_out_date)}</td>
              <td style={styles.thTd}>
                <button
                  style={styles.viewBtn}
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.viewBtnHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = styles.viewBtn.backgroundColor)}
                  onClick={() => handleViewClick(booking.booking_id)} // Pass booking ID to the handler
                >
                  View
                </button>
              </td>
              <td style={styles.thTd}>
                <button
                  style={styles.deleteBtn}
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.deleteBtnHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = styles.deleteBtn.backgroundColor)}
                  onClick={() => handleDeleteClick(booking.booking_id)} // Pass booking ID to the delete handler
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckInDetails2nd;
