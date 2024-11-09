// seedData.js
const sequelize = require("./database");
const VehicleType = require("./models/VehicleType");
const Vehicle = require("./models/Vehicle");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed Vehicle Types
  const carType = await VehicleType.create({ name: "Car", wheels: 4 });
  const bikeType = await VehicleType.create({ name: "Bike", wheels: 2 });

  // Seed Vehicles for Car Type
  await Vehicle.create({ model: "Hatchback", typeId: carType.id });
  await Vehicle.create({ model: "SUV", typeId: carType.id });
  await Vehicle.create({ model: "Sedan", typeId: carType.id });

  // Seed Vehicles for Bike Type
  await Vehicle.create({ model: "Cruiser", typeId: bikeType.id });
  await Vehicle.create({ model: "Sports", typeId: bikeType.id });

  console.log("Database seeded successfully.");
};

seedDatabase().catch(console.error);
