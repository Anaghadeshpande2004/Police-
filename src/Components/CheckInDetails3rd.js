import React from "react";
import { useLocation } from "react-router-dom";


const CheckInDetails3rd = () => {
  const { state } = useLocation();
  const { customer } = state || {};

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Customer Details</h2>
        {customer ? (
          <div style={styles.detailsContainer}>
            <div style={styles.detailRow}>
              <span style={styles.label}>Name:</span> {customer.Name}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Hotel Name:</span> {customer.HotelName}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Check-In Date:</span> {customer.CheckInDate}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Check-Out Date:</span> {customer.CheckOutDate}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Phone Number:</span> {customer.PhoneNumber}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Address:</span> {customer.Address}
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Room Allocated:</span> {customer.RoomAllocated}
            </div>
            <img
              src={customer.Photo || "/public/person.jpg"}
              alt="Customer"
              style={styles.img}
            />
          </div>
        ) : (
          <p>Customer details not found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  },
  detailsContainer: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  detailRow: {
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  img: {
    width: "200px",
    height: "auto",
    borderRadius: "50%",
    marginTop: "20px",
  },
};

export default CheckInDetails3rd;