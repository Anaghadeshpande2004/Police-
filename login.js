const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Set up file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});
const upload = multer({ storage });

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost', // Your database host
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'hotelmanagementdb', // Your MySQL database name
});

// Test DB connection
db.connect(err => {
  if (err) {
    console.error('Database connection error: ', err);
    return;
  }
  console.log('Database connected!');
});

// **Login API**
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check if the user exists in the policeusers table
  const query = 'SELECT * FROM policeusers WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Check if user is found
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password matches
    const user = results[0];
    if (user.password === password) {
      // Successful login
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      // Invalid password
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

// **Suspect Submission API with File Upload**
app.post('/api/suspects', upload.single('file'), (req, res) => {
  const { name, identityProof, idNumber, vehicleNumber } = req.body;
  const fileUpload = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO suspects (name, identity_proof, id_number, vehicle_number, file_upload)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, identityProof, idNumber, vehicleNumber, fileUpload], (err, result) => {
    if (err) {
      console.error('Database insertion error: ', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Suspect added successfully', suspectId: result.insertId });
  });
});




// Endpoint to get customers based on date range
app.get("/api/customers", (req, res) => {
  const { fromDate, toDate } = req.query;
  console.log("Received fromDate:", fromDate, "toDate:", toDate); // Debugging

  // MySQL query to fetch customers based on date range
  const query = `
    SELECT c.CustomerID, c.Name, c.CheckInDate, c.CheckInTime, c.CheckOutDate, c.RoomAllocated, h.HotelName
    FROM Customers c
    JOIN Hotels h ON c.HotelID = h.HotelID
    WHERE c.CheckInDate BETWEEN ? AND ?
  `;
  
  db.query(query, [fromDate, toDate], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results); // Return the customers as a JSON response
  });
});



// Endpoint to fetch station profile data
app.get("/api/station-profile", (req, res) => {
  const query = "SELECT * FROM StationProfile LIMIT 1";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching station profile data:", err);
      res.status(500).send("Server error");
    } else {
      res.json(result[0]);
    }
  });
});


// Endpoint to update station profile data
app.put("/api/station-profile", (req, res) => {
  const {
    name,
    location,
    contact,
    email,
    officers_count,
    jurisdiction,
    established,
    station_head_name,
    station_head_image,
  } = req.body;

  const query = `
    UPDATE StationProfile SET
    name = ?, location = ?, contact = ?, email = ?, officers_count = ?, jurisdiction = ?, established = ?, 
    station_head_name = ?, station_head_image = ?
    WHERE id = 1;
  `;

  db.query(
    query,
    [
      name,
      location,
      contact,
      email,
      officers_count,
      jurisdiction,
      established,
      station_head_name,
      station_head_image,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating station profile data:", err);
        res.status(500).send("Server error");
      } else {
        res.json({ message: "Profile updated successfully" });
      }
    }
  );
});


app.get('/api/accommodations/counts', (req, res) => {
  const query = `
    SELECT 
      SUM(CASE WHEN r.availability_status = 'Occupied' THEN 1 ELSE 0 END) AS active,
      SUM(CASE WHEN r.availability_status = 'Available' THEN 1 ELSE 0 END) AS inactive
    FROM room r;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching accommodation counts:', err);
      res.status(500).send({ error: 'Database query failed' });
      return;
    }
    res.send(results[0]); // Return the first row with counts
  });
});

// Define the /api/accommodations route
app.get('/api/accommodations', (req, res) => {
  const query = `
    SELECT 
      h.hotel_id,
      h.hotel_name,
      SUM(CASE WHEN r.availability_status = 'Occupied' THEN 1 ELSE 0 END) AS active_rooms,
      SUM(CASE WHEN r.availability_status = 'Available' THEN 1 ELSE 0 END) AS inactive_rooms
    FROM hotel h
    LEFT JOIN room r ON h.hotel_id = r.hotel_id
    GROUP BY h.hotel_id, h.hotel_name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching accommodations:', err);
      res.status(500).send({ error: 'Database query failed' });
      return;
    }
    res.json(results);
  });
});

  
app.get('/api/hotel-details/:hotelId', (req, res) => {
  const hotelId = req.params.hotelId;
  const query = `
    SELECT h.hotel_name, h.hotel_id, r.room_id, c.customer_id, c.name AS customer_name, r.availability_status
    FROM hotel h
    LEFT JOIN room r ON h.hotel_id = r.hotel_id
    LEFT JOIN bookings b ON r.room_id = b.room_id
    LEFT JOIN customer c ON b.customer_id = c.customer_id
    WHERE h.hotel_id = ?;
  `;

  db.query(query, [hotelId], (err, results) => {
    if (err) {
      console.error('Error fetching hotel details:', err);
      res.status(500).send({ error: 'Database query failed' });
      return;
    }
    res.send(results);
  });
});



// Route for fetching hoppers data
app.get('/api/hoppers', (req, res) => {
  const query = `
    SELECT suspect_id, name, vehicle_number, COUNT(DISTINCT hotel_id) AS hotel_visits
    FROM suspect_table
    LEFT JOIN bookings ON bookings.customer_id = suspect_table.suspect_id
    WHERE bookings.check_in_date BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
    GROUP BY suspect_table.suspect_id
    HAVING hotel_visits > 1  -- This will filter for people who have visited more than 1 hotel
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching hoppers:", err);
      return res.status(500).send("Error fetching hoppers");
    }

    res.json(results); // Send the fetched hoppers data as JSON
  });
});


// Get all suspects
app.get('/api/suspect', (req, res) => {
  const query = 'SELECT * FROM suspects';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching suspects:', err.message);
      res.status(500).json({ error: 'Failed to fetch suspects' });
    } else {
      res.json(results);
    }
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



