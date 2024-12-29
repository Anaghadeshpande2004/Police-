import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SuspectForm.css';
import image from '../Assests/SuspectImage.jpg';




const SuspectForm = () => {
  const [name, setName] = useState('');
  const [identityProof, setIdentityProof] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [vehicleError, setVehicleError] = useState('');
  const [nameError, setNameError] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleCancel = () => {
    setName('');
    setIdentityProof('');
    setIdNumber('');
    setVehicleNumber('');
    setFile(null);
    setError('');
    setVehicleError('');
    setNameError('');
  };

  const validateForm = () => {
    setError('');
    setVehicleError('');
    setNameError('');

    if (!name || !identityProof || !idNumber || !vehicleNumber) {
      setError('Please fill all the required fields.');
      return false;
    }

    const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
    if (!nameRegex.test(name)) {
      setNameError('Name should contain at least two words.');
      return false;
    }

    const vehicleRegex = /^[A-Z]{2}\d{2}[A-Z]{1}\d{4}$/;
    if (!vehicleRegex.test(vehicleNumber)) {
      setVehicleError('Vehicle number must be in the format KA63Z5662.');
      return false;
    }

    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('identityProof', identityProof);
    formData.append('idNumber', idNumber);
    formData.append('vehicleNumber', vehicleNumber);
    formData.append('file', file);

    fetch('http://localhost:5000/api/suspects', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        alert('Suspect added successfully.');
        navigate('/suspect'); // Navigate to the suspects list
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  return (
    <div className="suspect-form-container">
      <div className="image-container">
        <img src={image} alt="Suspect Interrogation" className="form-image" />
      </div>
      <form encType="multipart/form-data">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {nameError && <p className="error-message">{nameError}</p>}
        <label htmlFor="identityProof">Identity Proof:</label>
        <select
          id="identityProof"
          value={identityProof}
          onChange={(e) => setIdentityProof(e.target.value)}
          required
        >
          <option value="">Select an Identity Proof</option>
          <option value="passport">Passport</option>
          <option value="driverLicense">Driver's License</option>
          <option value="aadhaar">Aadhaar Card</option>
          <option value="voterId">Voter ID</option>
        </select>
        <label htmlFor="idNumber">ID Number:</label>
        <input
          type="text"
          id="idNumber"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
        />
        <label htmlFor="vehicleNumber">Vehicle Number:</label>
        <input
          type="text"
          id="vehicleNumber"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />
        {vehicleError && <p className="error-message">{vehicleError}</p>}
        <label htmlFor="file">Upload File (optional):</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {error && <p className="error-message">{error}</p>}
        <div className="button-container">
          <button id="cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button id="add" type="button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuspectForm;
