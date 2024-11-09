const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// Define the VehicleType model
const VehicleType = sequelize.define("VehicleType", {
  name: { type: DataTypes.STRING, allowNull: false },
  wheels: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = VehicleType;
