const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const VehicleType = require("../models/VehicleType");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");

// Get vehicle types based on wheel count
router.get("/vehicle-types/:wheels", async (req, res) => {
  try {
    const wheels = parseInt(req.params.wheels, 10);
    if (isNaN(wheels)) return res.status(400).send("Invalid wheel count");

    const vehicleTypes = await VehicleType.findAll({ where: { wheels } });
    res.json(vehicleTypes);
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    res.status(500).send("Error fetching vehicle types.");
  }
});

// Get vehicles by typeId
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

// Book vehicle with overlap check

router.post("/book-vehicle", async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;

  // Server-side validation for required fields
  if (!vehicleId || !startDate || !endDate) {
    return res
      .status(400)
      .json({
        error: "Missing required fields: vehicleId, startDate, endDate",
      });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validate date format and logical date order
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
    return res
      .status(400)
      .json({
        error: "Invalid date range. Ensure start date is before end date.",
      });
  }

  try {
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

    await Booking.create({ vehicleId, startDate, endDate });
    res.json({ message: "Booking confirmed!" });
  } catch (error) {
    console.error("Error booking vehicle:", error);
    res.status(500).json({ error: "Error booking vehicle." });
  }
});

module.exports = router;
