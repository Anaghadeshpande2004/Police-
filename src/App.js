import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import TodayDetails from './Components/TodayDetails';
import SuspectForm from './Components/SuspectForm';
import Footer from './Components/Footer';
import AccommodationList from './Components/AccommodationList';
import Profile from './Components/Profile';
import CheckIn from './Components/CheckIn';
import Navbar from './Components/Navbar';

const App = () => {
  const location = useLocation(); // Get the current location

  const isLoginPage = location.pathname === '/'; // Check if the current page is the login page

  return (
    <>
      {/* Render Header only if the current path is not '/' (login page) */}
      {!isLoginPage && <Navbar />}
      
      <div>
        {/* Main App Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/suspects" element={<SuspectForm />} />
          <Route path="/today-details" element={<TodayDetails />} />
          <Route path="/accommodationlist" element={<AccommodationList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkin" element={<CheckIn />} />
        </Routes>
      </div>

      {/* Render Footer only if the current path is not '/' (login page) */}
      {!isLoginPage && <Footer />}
    </>
  );
};

// Wrapper component that includes the Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
