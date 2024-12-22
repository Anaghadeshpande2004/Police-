import React, { useState } from 'react';
import '../Styles/Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [stationData, setStationData] = useState({
    name: "Central Police Station",
    location: "Downtown, CityName",
    contact: "+1 234 567 890",
    email: "centralpolice@cityname.gov",
    officersCount: 120,
    jurisdiction: "Downtown & Surrounding Areas",
    established: "1952",
    stationHeadName: "John Smith",
    stationHeadImage: "https://via.placeholder.com/150?text=👮",
  });

  const handleLogout = () => {
    alert("Logout successful!");
    // Replace with actual logout logic or redirect
    window.location.href = "../Components/Login.js";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStationData({ ...stationData, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = () => {
    const newImage = prompt("Enter the new profile image URL:");
    if (newImage) {
      setStationData({ ...stationData, stationHeadImage: newImage });
    }
  };

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
              src={stationData.stationHeadImage}
              alt={`${stationData.stationHeadName}, Station Head`}
              className="station-head-image"
            />
          </div>
          <button className="change-image-button" onClick={handleImageChange}>
            Change Profile Picture
          </button>
          <h2 className="station-head-name">{stationData.stationHeadName}</h2>
          <p className="station-head-title">Station Head</p>
        </div>

        {/* Station Details Section */}
        <div className="station-details">
          {Object.keys(stationData).map((key, index) => {
            if (key === "stationHeadName" || key === "stationHeadImage") return null;
            return (
              <div key={index} className="detail-row">
                <span className="detail-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
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
