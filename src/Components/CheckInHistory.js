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
    width: '680px',
    margin: '10px',
    padding: '30px 50px',
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
    marginBottom: '50px',
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
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
    marginLeft: '300px',
   
  },
};

export default CheckInHistory;
