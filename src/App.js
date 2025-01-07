import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import TodayDetails from './Components/TodayDetails';
import SuspectForm from './Components/SuspectForm';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import CheckIn from './Components/CheckIn';
import Navbar from './Components/Navbar';
import HoppersPage from './Components/HoppersPage';
import AccommodationOverview from './Components/AccommodationOverview';
import SuspectsList from './Components/SuspectsList';
import HotelDetails from './Components/HotelDetails';
import CheckInDetails2nd from './Components/CheckInDetails2nd';
import CheckInDetails3rd from './Components/CheckInDetails3rd';

const App = () => {
  const location = useLocation(); 

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
          <Route path="/accommodation" element={<AccommodationOverview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/hoppers" element={<HoppersPage />} />
          <Route path="/suspect" element={<SuspectsList />} />
          <Route path="/accomodation" element={<HotelDetails />} />
          <Route path="/checkin2" element={<CheckInDetails2nd />} />
          <Route path="/viewdetails/:bookingId" element={<CheckInDetails3rd />} /> 
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
