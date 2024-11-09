// routes/vehicleRoutes.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const VehicleType = require("../models/VehicleType");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");

// Endpoint to get vehicle types by wheel count
router.get("/vehicle-types/:wheels", async (req, res) => {
  try {
    const wheels = parseInt(req.params.wheels, 10);
    if (isNaN(wheels)) {
      return res.status(400).send("Invalid wheel count");
    }

    const vehicleTypes = await VehicleType.findAll({ where: { wheels } });
    res.json(vehicleTypes);
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    res.status(500).send("Error fetching vehicle types.");
  }
});

// Endpoint to get vehicles by type ID
router.get("/vehicles/:typeId", async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { typeId: req.params.typeId },
    });
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).send("Error fetching vehicles.");
  }
});

// Endpoint to handle vehicle booking with overlap check
router.post("/book-vehicle", async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;

  try {
    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          {
            startDate: { [Op.lte]: startDate },
            endDate: { [Op.gte]: endDate },
          },
        ],
      },
    });

    if (overlappingBooking) {
      return res
        .status(400)
        .send("Vehicle is already booked for the selected dates.");
    }

    // Create the booking if no overlap
    await Booking.create({ vehicleId, startDate, endDate });
    res.send("Booking confirmed!");
  } catch (error) {
    console.error("Error booking vehicle:", error);
    res.status(500).send("Error booking vehicle.");
  }
});

module.exports = router;
