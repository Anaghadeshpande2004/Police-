import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

// Combined CSS and JS

const styles = `
  .profile-page {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow: hidden;
  }

  /* Header Section */
  .profile-header {
    width: 100%;
    background-color: white;
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  .profile-header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #1e2a78;
  }

  /* Logout Button */
  .logout-button {
    padding: 10px 20px;
    background-color: #1e2a78;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
  }

  .logout-button:hover {
    background-color: #14205a;
  }

  /* Profile Content */
  .profile-content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-grow: 1;
    padding: 20px 50px;
    gap: 50px;
  }

  /* Station Head Section */
  .station-head-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    flex-shrink: 0;
  }

  .station-head-image-container {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    margin-bottom: 15px;
  }

  .change-image-button {
    margin-bottom: 15px;
    padding: 8px 15px;
    background-color: #1e2a78;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
  }

  .change-image-button:hover {
    background-color: #14205a;
  }

  /* Station Details Section */
  .station-details {
    width: 100%;
    max-width: 600px;
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f0f2f5;
  }

  .detail-row:last-child {
    border-bottom: none;
  }

  .detail-label {
    font-weight: 600;
    color: #333;
    font-size: 16px;
    flex: 1;
  }

  .detail-value,
  .detail-input {
    color: #666;
    font-size: 16px;
    flex: 1;
  }

  .detail-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
  }

  .edit-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #1e2a78;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .edit-button:hover {
    background-color: #14205a;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
