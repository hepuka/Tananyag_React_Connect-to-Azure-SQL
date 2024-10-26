const express = require("express");
const sql = require("mssql");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // for Azure SQL
    trustServerCertificate: false,
  },
};

// Connect to Azure SQL
sql.connect(config, (err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to Azure SQL Database");
  }
});

// Sample endpoint to fetch data from the database
app.get("/api/data", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query("SELECT * FROM users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Start the server
const PORT = process.env.DB_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
