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

// **Accommodation API**
// Fetch active/inactive accommodations
app.get('/api/accommodations', (req, res) => {
  const { status } = req.query;

  const query = `
    SELECT hotelName, type, status 
    FROM accommodations 
    WHERE status = ?
  `;

  db.query(query, [status], (err, results) => {
    if (err) {
      console.error('Error fetching accommodations:', err);
      return res.status(500).json({ message: 'Failed to fetch accommodations' });
    }
    res.status(200).json(results);
  });
});

// **Add Accommodation API with Image Upload**
app.post('/api/accommodations', upload.single('image'), (req, res) => {
  const { hotelName, type, status } = req.body;
  const imageUpload = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO accommodations (hotelName, type, status, image)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [hotelName, type, status, imageUpload], (err, result) => {
    if (err) {
      console.error('Database insertion error: ', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Accommodation added successfully', accommodationId: result.insertId });
  });
});

// **Update Accommodation Status API**
app.put('/api/accommodations/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = `
    UPDATE accommodations 
    SET status = ? 
    WHERE id = ?
  `;

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error('Database update error: ', err);
      return res.status(500).json({ message: 'Failed to update accommodation' });
    }
    res.status(200).json({ message: 'Accommodation status updated' });
  });
});

// **Accommodation Counts API**
app.get('/api/accommodations/counts', (req, res) => {
  const query = `
    SELECT 
      COUNT(CASE WHEN status = 'active' THEN 1 END) AS active,
      COUNT(CASE WHEN status = 'inactive' THEN 1 END) AS inactive
    FROM accommodations
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching accommodation counts:', err);
      return res.status(500).json({ message: 'Failed to fetch accommodation counts' });
    }

    const counts = results[0];
    res.status(200).json({
      active: counts.active,
      inactive: counts.inactive
    });
  });
});

app.get("/api/checkin-details", (req, res) => {
  const query = `
    SELECT 
      h.history_id, 
      h.customer_id, 
      c.name AS customer_name, 
      h.check_in_date, 
      IF(h.check_in_time = '0000-00-00 00:00:00', NULL, h.check_in_time) AS check_in_time,
      h.check_out_date 
    FROM 
      checkinhistory h
    INNER JOIN 
      customer c 
    ON 
      h.customer_id = c.customer_id
    ORDER BY 
      h.check_in_date, h.check_in_time;
  `;

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }

    // Check if results are empty
    if (results.length === 0) {
      return res.status(200).json({ message: "No check-in data available" });
    }

    // Optionally transform the results to ensure valid dates
    const transformedResults = results.map((result) => {
      return {
        ...result,
        check_in_time: result.check_in_time ? result.check_in_time : "N/A",  // Handle null or empty time
        check_in_date: result.check_in_date ? result.check_in_date : "N/A",  // Handle null or empty date
        check_out_date: result.check_out_date ? result.check_out_date : "N/A", // Handle null or empty checkout date
      };
    });

    console.log(transformedResults);  // Log to verify transformation (optional)

    // Send back the transformed data
    res.status(200).json(transformedResults);
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



