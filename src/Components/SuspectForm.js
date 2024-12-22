import React, { useState } from 'react';
import '../Styles/SuspectForm.css';
import image from '../Assests/SuspectImage.jpg';

const SuspectForm = () => {
  const [name, setName] = useState('');
  const [identityProof, setIdentityProof] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [file, setFile] = useState(null);

  const handleCancel = () => {
    // Clear the form inputs
    setName('');
    setIdentityProof('');
    setIdNumber('');
    setVehicleNumber('');
    setFile(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();

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
      .then((data) => {
        alert('Suspect added successfully: ' + data.suspectId);
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  return (
    <div className="suspect-form-container">
      {/* Image Section */}
      <div className="image-container">
        <img
          src={image}
          alt="Suspect Interrogation"
          className="form-image"
        />
      </div>

      {/* Form Section */}
      <form encType="multipart/form-data">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />

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
        <br />
        <br />

        <label htmlFor="idNumber">ID Number:</label>
        <input
          type="text"
          id="idNumber"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="vehicleNumber">Vehicle Number:</label>
        <input
          type="text"
          id="vehicleNumber"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="file">Upload File (optional):</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <br />

        {/* Buttons */}
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
