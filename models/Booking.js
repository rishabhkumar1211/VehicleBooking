const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Vehicle = require("./Vehicle");

// Define the Booking model
const Booking = sequelize.define("Booking", {
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vehicle,
      key: "id",
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Booking;
