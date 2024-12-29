import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/HoppersPage.css';  // Ensure this CSS file is in the same directory

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
    <div className="container">
      <header>
        <h1>Hoppers Found: {hoppers.length}</h1>
        <p>
          Risk Levels: <span style={{ color: "red" }}>High</span> - Red,{" "}
          <span style={{ color: "orange" }}>Medium</span> - Orange,{" "}
          <span style={{ color: "green" }}>Low</span> - Green
        </p>
      </header>

      <div className="hoppers">
        {hoppers.length === 0 ? (
          <p>No hoppers found.</p>
        ) : (
          hoppers.map((hopper) => {
            const riskLevel = getRiskLevel(hopper.hotel_visits);
            return (
              <div className="hopper-card" key={hopper.suspect_id}>
                <img
                  src="https://img.icons8.com/ios/50/000000/person-male.png"
                  alt="Hopper"
                />
                <div className="hopper-details">
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
