// models/VehicleType.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const VehicleType = sequelize.define("VehicleType", {
  name: { type: DataTypes.STRING, allowNull: false },
  wheels: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = VehicleType;
