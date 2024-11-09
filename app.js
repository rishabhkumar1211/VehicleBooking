// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", vehicleRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully.");
    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
