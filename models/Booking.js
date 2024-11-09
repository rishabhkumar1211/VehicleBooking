const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Vehicle = require("./Vehicle");

// Define the Booking model, representing vehicle bookings with user information
const Booking = sequelize.define("Booking", {
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vehicle,
      key: "id",
    },
    comment: "Foreign key linking to the Vehicle model",
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "First name of the person making the booking",
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Last name of the person making the booking",
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Type of vehicle booked, for historical tracking",
  },
  wheels: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "Number of wheels of the vehicle booked, for historical tracking",
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: "The start date of the booking period",
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: "The end date of the booking period",
  },
});

module.exports = Booking;
