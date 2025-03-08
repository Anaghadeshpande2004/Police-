import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CheckInDetails3rd() {
  const { bookingId } = useParams(); // Get bookingId from the URL
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Booking ID:", bookingId); // Debugging line

    if (!bookingId) {
      setError("Invalid booking ID provided.");
      setLoading(false);
      return;
    }

    setLoading(true); // Set loading to true before fetching data
    fetch(`http://localhost:5000/api/booking/${bookingId}`)
      .then((response) => {
        if (!response.ok) {
          const errorMessage =
            response.status === 404
              ? "Booking not found."
              : `Error: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched booking details:", data); // Debugging line
        setBookingDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error); // Debugging line
        setError(error.message);
        setLoading(false);
      });
  }, [bookingId]);

  const styles = {
    container: {
      width: "80%",
      margin: "20px auto",
      fontFamily: "poppins",
      overflow: "hidden"
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#007bff",
      marginBottom: "10px",
    },
    section: {
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#F0F8FF",
    },
    sectionTitle: {
      fontSize: "20px",
      color: "#0056b3",
    },
    info: {
      marginTop: "8px",
      fontSize: "16px",
      color: "#333",
    },
    error: {
      color: "red",
      fontSize: "18px",
    },
    imagesContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "20px",
    },
    imageWrapper: {
      textAlign: "center",
    },
    image: {
      width: "250px",
      height: "250px",
      objectFit: "cover",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    imageLabel: {
      marginTop: "10px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <div>Loading booking details...</div>
      ) : error ? (
        <div style={styles.error}>Error: {error}</div>
      ) : bookingDetails ? (
        <div>
          {/* Images Section */}
          <div style={styles.imagesContainer}>
            <div style={styles.imageWrapper}>
              <img
                src={bookingDetails.customer_photo}
                alt="Customer Photo"
                style={styles.image}
              />
              <div style={styles.imageLabel}>Customer Photo</div>
            </div>
            <div style={styles.imageWrapper}>
              <img
                src={bookingDetails.identity_proof_photo}
                alt="Identity Proof"
                style={styles.image}
              />
              <div style={styles.imageLabel}>Identity Proof</div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Customer Details</div>
            <div style={styles.info}>
              <strong>Name:</strong> {bookingDetails.customer_name}
            </div>
            <div style={styles.info}>
              <strong>Address:</strong> {bookingDetails.customer_address}
            </div>
            <div style={styles.info}>
              <strong>Phone No:</strong> {bookingDetails.customer_phone}
            </div>
            <div style={styles.info}>
              <strong>Aadhar Number:</strong> {bookingDetails.customer_aadhar}
            </div>
          </div>

          {/* Room Details Section */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Room Details</div>
            <div style={styles.info}>
              <strong>No of Rooms:</strong> {bookingDetails.room_type}
            </div>
            <div style={styles.info}>
              <strong>Room Number:</strong> {bookingDetails.room_number}
            </div>
            
          </div>

          {/* Hotel Details Section */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Hotel Details</div>
            <div style={styles.info}>
              <strong>Hotel Name:</strong> {bookingDetails.hotel_name}
            </div>
            <div style={styles.info}>
              <strong>GST Number:</strong> {bookingDetails.gst_number}
            </div>
          </div>
        </div>
      ) : (
        <div>No booking details found.</div>
      )}
    </div>
  );
}

export default CheckInDetails3rd;
