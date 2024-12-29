import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [isEditing, setIsEditing] = useState(false);
  const [stationData, setStationData] = useState(null);

  useEffect(() => {
    // Fetch profile data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/station-profile");
        const data = await response.json();
        setStationData(data);
      } catch (error) {
        console.error("Error fetching station profile:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    alert("Logout successful!");
    navigate("/"); // Redirect to the login page
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStationData({ ...stationData, [name]: value });
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        const response = await fetch("http://localhost:5000/api/station-profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stationData),
        });

        if (response.ok) {
          alert("Profile updated successfully!");
        } else {
          alert("Error updating profile.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = () => {
    const newImage = prompt("Enter the new profile image URL:");
    if (newImage) {
      setStationData({ ...stationData, station_head_image: newImage });
    }
  };

  if (!stationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <h1>Station Profile</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Station Head Image Section */}
        <div className="station-head-section">
          <div className="station-head-image-container">
            <img
              src={stationData.station_head_image}
              alt={`${stationData.station_head_name}, Station Head`}
              className="station-head-image"
            />
          </div>
          <button className="change-image-button" onClick={handleImageChange}>
            Change Profile Picture
          </button>
          <h2 className="station-head-name">{stationData.station_head_name}</h2>
          <p className="station-head-title">Station Head</p>
        </div>

        {/* Station Details Section */}
        <div className="station-details">
          {Object.keys(stationData).map((key, index) => {
            if (key === "id" || key === "station_head_name" || key === "station_head_image") return null;
            return (
              <div key={index} className="detail-row">
                <span className="detail-label">{key.replace(/([A-Z])/g, " $1").toUpperCase()}</span>
                {isEditing ? (
                  <input
                    className="detail-input"
                    type="text"
                    name={key}
                    value={stationData[key]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{stationData[key]}</span>
                )}
              </div>
            );
          })}
          <button className="edit-button" onClick={toggleEdit}>
            {isEditing ? "Save Changes" : "Edit Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
