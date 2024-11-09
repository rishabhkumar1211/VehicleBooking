const sequelize = require("./database");
const VehicleType = require("./models/VehicleType");
const Vehicle = require("./models/Vehicle");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed Car Types with realistic models
  const hatchbackType = await VehicleType.create({
    name: "Hatchback",
    wheels: 4,
  });
  const suvType = await VehicleType.create({ name: "SUV", wheels: 4 });
  const sedanType = await VehicleType.create({ name: "Sedan", wheels: 4 });

  // Seed Bike Types with realistic models
  const cruiserType = await VehicleType.create({ name: "Cruiser", wheels: 2 });
  const sportsType = await VehicleType.create({ name: "Sports", wheels: 2 });

  // Associate Vehicles with Types
  await Vehicle.create({ model: "Toyota Yaris", typeId: hatchbackType.id });
  await Vehicle.create({ model: "Ford EcoSport", typeId: suvType.id });
  await Vehicle.create({ model: "Honda Accord", typeId: sedanType.id });
  await Vehicle.create({
    model: "Harley Davidson Street 750",
    typeId: cruiserType.id,
  });
  await Vehicle.create({ model: "Yamaha YZF R1", typeId: sportsType.id });

  console.log("Database seeded successfully with realistic models.");
};

seedDatabase().catch(console.error);
