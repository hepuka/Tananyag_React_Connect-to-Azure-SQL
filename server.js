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

app.get("/api/data", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query("SELECT * FROM users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.post("/api/add-user", async (req, res) => {
  let body = req.body;

  try {
    // Create a new request for the SQL connection
    const request = new sql.Request();

    // Set each parameter for the SQL query to prevent SQL injection
    request.input("name", sql.VarChar, body.name);
    request.input("bdate", sql.Date, body.bdate);
    request.input("bplace", sql.VarChar, body.bplace);
    request.input("email", sql.VarChar, body.email);
    request.input("password", sql.VarChar, body.password);
    request.input("pin", sql.VarChar, body.pin);
    request.input("role", sql.VarChar, body.role);
    request.input("taxnumber", sql.VarChar, body.taxnumber);

    // Execute the query with parameterized inputs
    const result = await request.query(
      "INSERT INTO users (name, bdate, bplace, email, password, pin, role, taxnumber) VALUES (@name, @bdate, @bplace, @email, @password, @pin, @role, @taxnumber)"
    );

    // Respond with the result
    res.json({ message: "User added successfully", data: result.recordset });
  } catch (err) {
    console.error("Error inserting user data:", err);
    res.status(500).json({ error: "An error occurred while inserting data" });
  }
});

// Start the server
const PORT = process.env.DB_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
