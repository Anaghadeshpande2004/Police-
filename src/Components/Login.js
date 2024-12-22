import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'; 
import image from '../Assests/loginn.png';  // Corrected image import

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        navigate('/dashboard'); // Redirect to the dashboard page
      } else {
        const error = await response.json();
        alert(error.message); // Show error message
      }
    } catch (err) {
      console.error('Error logging in:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
          
      <div className="login-box">
      
        <div className="image-section">
          <img src={image} alt="Login Illustration" />
        </div>
    
                <form>
          <div className="textbox">
        <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleLogin} className="login-btn">
            Login
          </button>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
          <p className="terms">
            By logging in, you agree with our{' '}
            <a href="#">Terms & Conditions</a> and{' '}
            <a href="#">Privacy Statement</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
