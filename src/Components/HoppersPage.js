import React, { useEffect, useState } from "react";
import axios from "axios";

const HoppersPage = () => {
  const [hoppers, setHoppers] = useState([]);

  useEffect(() => {
    // Fetch the hoppers data from the API
    axios
      .get("/api/hoppers")  // Ensure this matches your backend route
      .then((response) => {
        setHoppers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hoppers data:", error);
      });
  }, []);

  // Function to determine the risk level based on the number of hotels visited
  const getRiskLevel = (hotelVisits) => {
    if (hotelVisits > 3) return "High";
    if (hotelVisits === 3) return "Medium";
    return "Low";
  };

  return (
    <div className="hoppers-page-container">
      <header className="hoppers-page-header">
        <h1>Hoppers Found: {hoppers.length}</h1>
        <p>
          Risk Levels: <span style={{ color: "red" }}>High</span> - Red,{" "}
          <span style={{ color: "orange" }}>Medium</span> - Orange,{" "}
          <span style={{ color: "green" }}>Low</span> - Green
        </p>
      </header>

      <div className="hoppers-page-cards-container">
        {hoppers.length === 0 ? (
          <p>No hoppers found.</p>
        ) : (
          hoppers.map((hopper) => {
            const riskLevel = getRiskLevel(hopper.hotel_visits);
            return (
              <div className="hoppers-page-card" key={hopper.suspect_id}>
                <img
                  src="https://img.icons8.com/ios/50/000000/person-male.png"
                  alt="Hopper"
                />
                <div className="hoppers-page-card-details">
                  <p>
                    <strong>Name:</strong> {hopper.name}
                  </p>
                  <p>
                    <strong>ID:</strong> {hopper.suspect_id}
                  </p>
                  <p>
                    <strong>Vehicle No.:</strong> {hopper.vehicle_number}
                  </p>
                  <p>
                    <strong>Risk Level:</strong>{" "}
                    <span className={riskLevel.toLowerCase()}>{riskLevel}</span>
                  </p>
                  <p>
                    <strong>Hotels Visited:</strong> {hopper.hotel_visits}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HoppersPage;

{/* Add this CSS below */}
<style jsx>{`
  /* General reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Body styles */
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    padding: 20px;
  }

  /* Header styles */
  .hoppers-page-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .hoppers-page-header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
  }

  .hoppers-page-header p {
    font-size: 1.2em;
    color: #555;
  }

  /* Hopper cards container */
  .hoppers-page-cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  /* Individual hopper card */
  .hoppers-page-card {
    background-color: white;
    width: 250px;
    margin: 15px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .hoppers-page-card img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 15px;
  }

  /* Hopper details */
  .hoppers-page-card-details {
    text-align: left;
  }

  .hoppers-page-card-details p {
    font-size: 1em;
    margin: 5px 0;
  }

  .hoppers-page-card-details strong {
    font-weight: bold;
  }

  /* Risk Level Styling */
  .low {
    color: green;
  }

  .medium {
    color: orange;
  }

  .high {
    color: red;
  }

  /* Add responsive design for smaller screens */
  @media (max-width: 768px) {
    .hoppers-page-cards-container {
      flex-direction: column;
      align-items: center;
    }

    .hoppers-page-card {
      width: 90%;
      margin: 10px 0;
    }
  }
`}</style>
