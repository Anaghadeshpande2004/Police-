import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation(); // Get the current route
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');

  const districts = ['Hubli'];
  const areas = {
    Hubli: ['Gokul Road', 'Vidyanagar', 'Keshwapur'],
  };

  
  // Map route paths to JSX content
  const pageTitles = {
    '/home': <h2>StayEaze</h2>,
    '/checkin': <h2>CheckIn</h2>,
    '/accommodation': <h2>Accommodation</h2>,
    '/suspects': <h2>Suspects</h2>,
    '/hoppers': <h2>Hoppers</h2>,
    '/profile': <h2>Profile</h2>,
    '/notifications': <h2>Notifications</h2>,
    '/suspect': <h2>Suspect List</h2>,
    '/checkin2' : <h2>All Check In Details</h2>
  
  };

  const currentPage = pageTitles[location.pathname] || null; // Get the JSX content for the current page

  const isHomePage = location.pathname === '/home'; // Check if the current route is /home

  return (
    <div>
      <div className="navbar">
        {/* Render the current page title */}
        <div className="navbar-brand">
          {currentPage}
        </div>
        <div className="navbar-links">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/checkin">CheckIn</Link></li>
            <li><Link to="/accommodation">Accommodation</Link></li>
            <li><Link to="/suspects">Suspects</Link></li>
            <li><Link to="/hoppers">Hoppers</Link></li>
            
            {/* Conditionally render dropdowns only on the Home page */}
            {isHomePage && (
              <>
                <li>
                  <div className="district-search">
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="dropdown"
                    >
                      <option value="">Select District</option>
                      {districts.map((districtName, index) => (
                        <option key={index} value={districtName}>{districtName}</option>
                      ))}
                    </select>
                  </div>
                </li>
                <li>
                  <div className="area-search">
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="dropdown"
                    >
                      <option value="">Select Area</option>
                      {district && areas[district] ? areas[district].map((areaName, index) => (
                        <option key={index} value={areaName}>{areaName}</option>
                      )) : null}
                    </select>
                  </div>
                </li>
              </>
            )}

            <li><Link to="/profile"><FaUser /></Link></li>
            <li><Link to="/notifications"><FaBell /></Link></li>
          </ul>
        </div>
      </div>

      {/* Main content to avoid overlap */}
      <div className="main-content">
        {/* Add your page content here */}
      </div>

      

      {/* Add the CSS styles directly in the JS file */}
      <style jsx>{`
        /* General reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Body styles */
        body {
          margin: 0;
          padding: 0;
        }

        /* Navbar styles */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #041a59; /* Dark blue */
          color : white;
          padding: 20px 30px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          height: 10vh;
          font-family: Arial, sans-serif;
        }

        /* Ensure there is space below the navbar */
        .main-content {
          padding-top: 80px; /* Adjust to match navbar height */
        }

        .navbar-brand h2 {
          background-color: transparent;
          margin: 0;
          color : white;
        }

        .navbar-links ul {
          list-style-type: none;
          display: flex;
          margin: 0;
          padding: 0;
        }

        .navbar-links li {
          margin: 0 20px;
        }

        .navbar-links a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .navbar-links a:hover {
          color: #edf505; /* Lighter blue on hover */
        }

        /* Dropdown Styles */
        .dropdown {
          padding: 5px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          width: 150px;
        }

        /* Profile and Notifications Icons */
        .navbar-links li a {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px; /* Icon size */
        }

        .navbar-links li a:hover {
          background-color: transparent;
        }

        /* Search Bar Container */
        .search-bar {
          display: flex;
          gap: 10px;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
