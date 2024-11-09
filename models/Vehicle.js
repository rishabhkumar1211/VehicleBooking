// models/Vehicle.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const VehicleType = require("./VehicleType");

// Vehicle model
const Vehicle = sequelize.define("Vehicle", {
  model: { type: DataTypes.STRING, allowNull: false },
  typeId: {
    type: DataTypes.INTEGER,
    references: {
      model: VehicleType,
      key: "id",
    },
    allowNull: false,
  },
});

// Define the relationship
Vehicle.belongsTo(VehicleType, { foreignKey: "typeId" });
module.exports = Vehicle;
