const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// Define the VehicleType model, which represents different vehicle types based on wheel count
const VehicleType = sequelize.define("VehicleType", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "The name of the vehicle type, e.g., 'Sedan', 'SUV', etc.",
  },
  wheels: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "The number of wheels associated with this vehicle type.",
  },
});

module.exports = VehicleType;
