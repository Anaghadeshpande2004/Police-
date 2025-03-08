import React, { useState, useEffect } from "react";

const HoppersPage = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/checkinhistory")
            .then((response) => response.json())
            .then((data) => {
                const customerRisks = calculateRisk(data);
                setCustomers(customerRisks);
            });
    }, []);

    const calculateRisk = (data) => {
        const riskMap = {};
        data.forEach((record) => {
            const { customer_id, hotel_id, check_in_date } = record;
            if (!riskMap[customer_id]) riskMap[customer_id] = [];
            riskMap[customer_id].push({ hotel_id, check_in_date });
        });

        return Object.keys(riskMap).map((customer_id) => {
            const visits = riskMap[customer_id];
            visits.sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date));

            let riskLevel = "Low";
            const uniqueHotels = new Set();
            let countIn20Days = 1;
            let start = new Date(visits[0].check_in_date);

            for (let i = 1; i < visits.length; i++) {
                uniqueHotels.add(visits[i - 1].hotel_id);
                const current = new Date(visits[i].check_in_date);
                const diff = (current - start) / (1000 * 60 * 60 * 24); // days

                if (diff <= 20) {
                    countIn20Days++;
                } else {
                    start = current;
                    countIn20Days = 1;
                }

                if (countIn20Days > 3) {
                    riskLevel = "High";
                    break;
                } else if (countIn20Days === 2 && uniqueHotels.size > 1) {
                    riskLevel = "Medium";
                }
            }

            return {
                customer_id,
                riskLevel,
                visits: visits.length,
            };
        });
    };

    const styles = {
        container: {
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            textAlign: "center",
            marginBottom: "20px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
        },
        th: {
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            textAlign: "left",
            borderBottom: "2px solid #ddd",
        },
        td: {
            padding: "10px",
            textAlign: "left",
            borderBottom: "1px solid #ddd",
        },
        riskHigh: {
            color: "red",
            fontWeight: "bold",
        },
        riskMedium: {
            color: "orange",
            fontWeight: "bold",
        },
        riskLow: {
            color: "green",
            fontWeight: "bold",
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Customer Hoppers Risk Analysis</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Customer ID</th>
                        <th style={styles.th}>Risk Level</th>
                        <th style={styles.th}>Total Visits</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td style={styles.td}>{customer.customer_id}</td>
                            <td
                                style={{
                                    ...styles.td,
                                    ...(customer.riskLevel === "High"
                                        ? styles.riskHigh
                                        : customer.riskLevel === "Medium"
                                        ? styles.riskMedium
                                        : styles.riskLow),
                                }}
                            >
                                {customer.riskLevel}
                            </td>
                            <td style={styles.td}>{customer.visits}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HoppersPage;