import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/CheckIn.css'; // Import external CSS for styles
import { format } from "date-fns"; // Import the date-fns library

// Utility function to format date and time
function formatDateTime(isoString) {
  if (!isoString || isoString === "N/A" || isoString === '0000-00-00 00:00:00' || isNaN(new Date(isoString))) {
    return "N/A"; // Display N/A for invalid or missing dates
  }
  return format(new Date(isoString), "MMM dd, yyyy h:mm a");
}

const CheckInDetails = () => {
  const [checkInData, setCheckInData] = useState([]); // State to store check-in data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:5000/api/checkin-details")
      .then((response) => {
        setCheckInData(response.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        setLoading(false); // Stop loading if there's an error
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || error.message); // Show error to user
      });
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
        {/* Optional: Add a spinner or loader for better user experience */}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center">
        <p>Error: {error}</p>
        {/* Optional: Provide user-friendly error handling */}
      </div>
    );
  }

  // Render table with formatted data
  return (
    <div className="container">
      
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Check In Time</th>
            <th>Check In Date</th>
            <th>View Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {checkInData.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No check-in data available.
              </td>
            </tr>
          ) : (
            checkInData.map((item, index) => (
              <tr key={item.history_id}>
                <td>{index + 1}</td>
                <td>{item.customer_id}</td>
                <td>{item.customer_name || "N/A"}</td>
                <td>{formatDateTime(item.check_in_time)}</td>
                <td>{formatDateTime(item.check_in_date)}</td>
                <td>
                  <button className="btn btn-primary">
                    <i className="fa fa-eye"></i> View Details
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CheckInDetails;
