// app.js (Updated with Booking Logic)
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const vehicleRoutes = require("./routes/vehicleRoutes"); // API routes

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use("/api", vehicleRoutes);

// Sync all models and start the server
const startServer = async () => {
  try {
    await sequelize.sync(); // Sync all defined models to create tables
    console.log("Database synced successfully.");
    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
