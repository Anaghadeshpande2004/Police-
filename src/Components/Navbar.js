import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { FaBell, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');

  const districts = [ 'Hubli', ];
  const areas = {
   
    Hubli: ['Gokul Road', 'Vidyanagar', 'Keshwapur'],
   
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand">
          <h2>StayEaze</h2>
        </div>
        <div className="navbar-links">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/checkin">CheckIn</Link></li>
            <li><Link to="/accommodation">Accommodation</Link></li>
            <li><Link to="/suspects">Suspects</Link></li>
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
