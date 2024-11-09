// models/Booking.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Vehicle = require("./Vehicle");

const Booking = sequelize.define("Booking", {
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vehicle,
      key: "id",
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
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
