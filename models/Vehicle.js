const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const VehicleType = require("./VehicleType");

// Define the Vehicle model, representing specific vehicle models associated with a VehicleType
const Vehicle = sequelize.define("Vehicle", {
  model: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "The model name of the vehicle, e.g., 'Camry', 'Model S', etc.",
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: VehicleType,
      key: "id",
    },
    comment: "Foreign key linking to the VehicleType model",
  },
});

Vehicle.belongsTo(VehicleType, { foreignKey: "typeId", as: "type" });

module.exports = Vehicle;
