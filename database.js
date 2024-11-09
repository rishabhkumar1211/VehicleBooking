// database.js
const { Sequelize } = require("sequelize");

// Configure and connect to SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false, // Disable logging for cleaner console output
});

// Authenticate and log success or error
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((error) => console.error("Error connecting to the database:", error));

module.exports = sequelize;
