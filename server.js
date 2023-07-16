const express = require('express');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

// Middleware for parsing JSON request body
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
