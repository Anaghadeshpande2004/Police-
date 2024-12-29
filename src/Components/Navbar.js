import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';
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

      {/* Footer */}
      <div className="footer">
        <p>© 2024 StayEaze. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Navbar;
