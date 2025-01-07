import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../Assests/loginn.png'; // Corrected image import

// Inject CSS styles dynamically
const injectStyles = () => {
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #f0f4f8;
      color: #333;
    }

    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      padding: 10px;
    }

    .login-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      background-color: #fff;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      height: 80vh;
    }

    .image-section {
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
    }

    .image-section img {
      width: 100%;
      max-width: 450px;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    form {
      width: 60%;
    }

    h2 {
      margin-bottom: 25px;
      color: #5f6368;
      font-size: 24px;
      text-align: center;
      font-weight: 600;
    }

    .textbox {
      margin-bottom: 20px;
    }

    .textbox input {
      width: 100%;
      padding: 18px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .textbox input:focus {
      border-color: #4e73df;
      outline: none;
    }

    button.login-btn {
      width: 100%;
      padding: 18px;
      background-color: #4e73df;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button.login-btn:hover {
      background-color: #2e59d9;
    }

    .signup-link {
      margin-top: 15px;
      text-align: center;
    }

    .signup-link a {
      color: #007bff;
      font-weight: 500;
      text-decoration: none;
      transition: text-decoration 0.3s ease;
    }

    .signup-link a:hover {
      text-decoration: underline;
    }

    .terms {
      margin-top: 25px;
      font-size: 13px;
      color: #6c757d;
      text-align: center;
    }

    .terms a {
      color: #007bff;
      text-decoration: none;
    }

    .terms a:hover {
      text-decoration: underline;
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

const Login = () => {
  injectStyles(); // Apply styles on component load
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
        navigate('/home'); // Redirect to the dashboard page
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
