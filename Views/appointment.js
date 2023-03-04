const express = require("express");
const router = express.Router();

const Appointment = require("../models/appointment");
const ImagingTest = require("../models/imagingTest");
const User = require("../models/user");

router.post("/appointments", async (req, res) => {
  try {
    const { userId, imagingTestId, appointmentDate } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if imaging test exists
    const imagingTest = await ImagingTest.findById(imagingTestId);
    if (!imagingTest) {
      return res.status(404).json({ message: "Imaging test not found" });
    }

    // Create new appointment
    const appointment = new Appointment({
      userId,
      imagingTestId,
      appointmentDate,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Appointment creation failed" });
  }
});

router.get("/appointments/:uid", async (req, res) => {
  try {
    const userId = req.params.uid;
    const appointments = await Appointment.find({ _id: userId })
      .populate("userId", "-password -__v")
      .populate("imagingTestId", "-__v")
      .exec();
    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

module.exports = router;
