import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

// Register required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip);

const CheckInHistory = () => {
  const data = {
    labels: ["March", "April", "May", "June", "July", "August", "September"],
    datasets: [
      {
        label: "Check-ins",
        data: [300, 400, 500, 750, 600, 650, 580],
        borderColor: "blue",
        borderWidth: 2,
        pointBackgroundColor: "blue",
        tension: 0.4, // Smooth curve effect
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the dataset label
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.chartContainer}>
        <h2 style={styles.chartTitle}>Check-in History</h2>
        <Line data={data} options={options} />
        <button style={styles.viewDetailsBtn}>View Details</button>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    width: '650px',
    margin: 0,
    padding: '30px 10px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  chartContainer: {
    width: '500px',
    maxHeight: '400px',
    marginBottom: '30px',
  },
  chartTitle: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    backgroundColor: "transparent",
    marginBottom: "20px",
    color: "black",
  },
  viewDetailsBtn: {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default CheckInHistory;
