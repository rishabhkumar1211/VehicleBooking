// database.js
const { Sequelize } = require("sequelize");

// Connect to SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((error) => console.error("Error connecting to the database:", error));

module.exports = sequelize;
