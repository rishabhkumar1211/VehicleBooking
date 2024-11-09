// models/Vehicle.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const VehicleType = require("./VehicleType");

const Vehicle = sequelize.define("Vehicle", {
  model: { type: DataTypes.STRING, allowNull: false },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: VehicleType,
      key: "id",
    },
  },
});

Vehicle.belongsTo(VehicleType, { foreignKey: "typeId" });
module.exports = Vehicle;
