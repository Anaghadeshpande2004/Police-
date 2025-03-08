import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../Assests/SuspectImage.jpg";

// SuspectForm Component
const SuspectForm = () => {
  const [name, setName] = useState("");
  const [identityProof, setIdentityProof] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [vehicleError, setVehicleError] = useState("");
  const [nameError, setNameError] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const handleCancel = () => {
    setName("");
    setIdentityProof("");
    setIdNumber("");
    setVehicleNumber("");
    setFile(null);
    setError("");
    setVehicleError("");
    setNameError("");
  };

  const validateForm = () => {
    setError("");
    setVehicleError("");
    setNameError("");

    if (!name || !identityProof || !idNumber || !vehicleNumber) {
      setError("Please fill all the required fields.");
      return false;
    }

    const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
    if (!nameRegex.test(name)) {
      setNameError("Name should contain at least two words.");
      return false;
    }

    const vehicleRegex = /^[A-Z]{2}\d{2}[A-Z]{1}\d{4}$/;
    if (!vehicleRegex.test(vehicleNumber)) {
      setVehicleError("Vehicle number must be in the format KA63Z5662.");
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
    formData.append("name", name);
    formData.append("identityProof", identityProof);
    formData.append("idNumber", idNumber);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("file", file);

    fetch("http://localhost:5000/api/suspects", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        alert("Suspect added successfully.");
        navigate("/suspect"); // Navigate to the suspects list
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div style={styles.suspectFormContainer}>
      <div style={styles.imageContainer}>
        <img src={image} alt="Suspect Interrogation" style={styles.formImage} />
      </div>
      <form encType="multipart/form-data">
        <label htmlFor="name" style={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.inputTextFileSelect}
        />
        {nameError && <p style={styles.errorMessage}>{nameError}</p>}
        <label htmlFor="identityProof" style={styles.label}>
          Identity Proof:
        </label>
        <select
          id="identityProof"
          value={identityProof}
          onChange={(e) => setIdentityProof(e.target.value)}
          required
          style={styles.inputTextFileSelect}
        >
          <option value="">Select an Identity Proof</option>
          <option value="passport">Passport</option>
          <option value="driverLicense">Driver's License</option>
          <option value="aadhaar">Aadhaar Card</option>
          <option value="voterId">Voter ID</option>
        </select>
        <label htmlFor="idNumber" style={styles.label}>
          ID Number:
        </label>
        <input
          type="text"
          id="idNumber"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
          style={styles.inputTextFileSelect}
        />
        <label htmlFor="vehicleNumber" style={styles.label}>
          Vehicle Number:
        </label>
        <input
          type="text"
          id="vehicleNumber"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
          style={styles.inputTextFileSelect}
        />
        {vehicleError && <p style={styles.errorMessage}>{vehicleError}</p>}
        <label htmlFor="file" style={styles.label}>
          Upload File (optional):
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.inputTextFileSelect}
        />
        {error && <p style={styles.errorMessage}>{error}</p>}
        <div style={styles.buttonContainer}>
          <button
            type="button"
            onClick={handleCancel}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="button" onClick={handleAdd} style={styles.addButton}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  suspectFormContainer: {
    width: "800px",
    padding: "10px",
    marginLeft: "400px",
    overflowY: "auto",
    marginBottom: "100px",
  },

  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  formImage: {
    width: "400px",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    objectFit: "contain",
    padding: "7px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  inputTextFileSelect: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "20px",
    width: "100%",
    boxSizing: "border-box",
  },
  cancelButton: {
    backgroundColor: "#e53935",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  addButton: {
    backgroundColor: "#6200ea",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "600px",
  },
  errorMessage: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },

 
  "@media (max-width: 480px)": {
    suspectFormContainer: {
      width: "100%", // Make it 95% for even smaller screens
    },
    formImage: {
      width: "100%",
      height: "auto",
    },
    inputTextFileSelect: {
      fontSize: "14px", // Smaller input font size for mobile
    },
    label: {
      fontSize: "14px", // Smaller font size for labels on mobile
    },
  },
};

export default SuspectForm;
