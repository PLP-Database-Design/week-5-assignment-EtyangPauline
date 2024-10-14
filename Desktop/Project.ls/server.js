const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Basic setup
app.use(express.json());

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving patients');
    } else {
      res.json(results);
    }
  });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving providers');
    } else {
      res.json(results);
    }
  });
});

// Question 3: Filter patients by first name
app.get('/patients/filter', (req, res) => {
  const { first_name } = req.query;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  
  db.query(query, [first_name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving patients by first name');
    } else {
      res.json(results);
    }
  });
});

// Question 4: Retrieve providers by specialty
app.get('/providers/filter', (req, res) => {
  const { specialty } = req.query;
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  
  db.query(query, [specialty], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving providers by specialty');
    } else {
      res.json(results);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
