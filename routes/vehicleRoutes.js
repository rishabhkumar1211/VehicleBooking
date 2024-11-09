const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const VehicleType = require("../models/VehicleType");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");

// Get vehicle types by wheel count
router.get("/vehicle-types/:wheels", async (req, res) => {
  try {
    const wheels = parseInt(req.params.wheels, 10);
    if (isNaN(wheels)) {
      return res.status(400).json({ error: "Invalid wheel count" });
    }

    const vehicleTypes = await VehicleType.findAll({ where: { wheels } });
    res.json(vehicleTypes);
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    res.status(500).json({ error: "Error fetching vehicle types." });
  }
});

// Get specific vehicle models by type ID
router.get("/vehicles/:typeId", async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { typeId: req.params.typeId },
    });
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Error fetching vehicles." });
  }
});

// Book a vehicle with overlap check
router.post("/book-vehicle", async (req, res) => {
  const {
    vehicleId,
    firstName,
    lastName,
    vehicleType,
    wheels,
    startDate,
    endDate,
  } = req.body;

  // Validation for required fields
  if (
    !vehicleId ||
    !firstName ||
    !lastName ||
    !vehicleType ||
    wheels === undefined ||
    !startDate ||
    !endDate
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validate date range
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
    return res
      .status(400)
      .json({
        error: "Invalid date range. Ensure start date is before end date.",
      });
  }

  try {
    // Check for overlapping bookings for the same vehicle
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
        .json({ error: "Vehicle is already booked for the selected dates." });
    }

    // Save the booking with all necessary details
    await Booking.create({
      vehicleId,
      firstName,
      lastName,
      vehicleType,
      wheels,
      startDate,
      endDate,
    });

    res.json({ message: "Booking confirmed!" });
  } catch (error) {
    console.error("Error booking vehicle:", error);
    res.status(500).json({ error: "Error booking vehicle." });
  }
});

module.exports = router;
