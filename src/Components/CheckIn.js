import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Import jsPDF

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

    try {
      const response = await fetch('http://localhost:5000/api/booking-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: checkInDate,
          endDate: checkOutDate,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Read error message from response
        throw new Error(errorMessage || 'Error fetching booking details.');
      }

      const data = await response.json();
      setHistory(data);

    } catch (error) {
      console.error('Error fetching data:', error.message);
      alert(error.message || 'Error fetching data.');
    }
  };

  // Convert UTC to IST (Indian Standard Time)
  const convertToIST = (utcDate) => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 5); // Add 5 hours to UTC
    date.setMinutes(date.getMinutes() + 30); // Add 30 minutes to make it IST
    return date.toLocaleDateString(); // Format the date as a date-only string
  };

  // Handle CSV download
  const downloadCSV = () => {
    const header = ['Hotel Name', 'Customer Name', 'Check In Date', 'Check Out Date', 'Room Number'];
    const rows = history.map(item => [
      item.hotel_name,
      item.name,
      convertToIST(item.check_in_date),
      convertToIST(item.check_out_date),
      item.room_number,
    ]);

    const csvContent = [
      header.join(','), // Header row
      ...rows.map(row => row.join(',')), // Data rows
    ].join('\n');

    // Create a link and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Only supported in modern browsers
      const fileName = 'booking_history.csv';
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', fileName);
      link.click();
    }
  };

  // Handle PDF download
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);

    // Add title
    doc.text('Booking History', 20, 20);

    // Add table headers
    const headers = ['Hotel Name', 'Customer Name', 'Check In Date', 'Check Out Date', 'Room Number'];
    const rows = history.map(item => [
      item.hotel_name,
      item.name,
      convertToIST(item.check_in_date),
      convertToIST(item.check_out_date),
      item.room_number,
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30,
      theme: 'grid',
      margin: { horizontal: 10 },
    });

    // Save the PDF
    doc.save('booking_history.pdf');
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
          All Booking Details
        </button>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        <h2>Booking History</h2>
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
      </div>

      {/* Table Container - moved outside search form */}
      {history.length > 0 && (
        <div style={styles.tableContainer}>
          
          <button onClick={downloadPDF} style={styles.downloadButton}>Download PDF</button>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Hotel Name</th>
                <th style={styles.th}>Customer Name</th>
                <th style={styles.th}>Check In Date</th>
                <th style={styles.th}>Check Out Date</th>
               
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr
                  key={index}
                  style={
                    index % 2 === 0
                      ? { ...styles.rowEven }
                      : { ...styles.rowOdd }
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = styles.rowHover.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0
                        ? styles.rowEven.backgroundColor
                        : styles.rowOdd.backgroundColor)
                  }
                >
                  <td style={styles.td}>{item.hotel_name}</td>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{convertToIST(item.check_in_date)}</td>
                  <td style={styles.td}>{convertToIST(item.check_out_date)}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
    maxWidth: '600px',  // Set a max width for the form and search area
    margin: '50px auto',
    padding: '20px',
    backgroundColor: 'transparent',
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
  tableContainer: {
    margin: '20px auto',
    maxWidth: '90%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    textAlign: 'left',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflowY: 'auto', // Enable vertical scrolling

  },
  th: {
    backgroundColor: '#1a73e8',
    color: '#fff',
    padding: '12px 15px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  rowEven: {
    backgroundColor: '#e8f0fe',
  },
  rowOdd: {
    backgroundColor: '#ffffff',
  },
  rowHover: {
    backgroundColor: '#d2e3fc',
  },
  downloadButton: {
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px', // Adds space below the button
    textAlign: 'center',
    marginTop: '10px', // Add space above the download button
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
    marginBottom: '10px', // Adds space between buttons
  },

};

export default CheckIn;
