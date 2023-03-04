const express = require("express");
const router = express.Router();

const ImagingTest = require("../models/imagingTest");

router.post("/imagingTests", async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    const imagingTest = new ImagingTest({ name, description, price, duration });
    await imagingTest.save();
    res.status(201).json({
      message: "Imaging test created successfully",
      imagingTest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Imaging test creation failed" });
  }
});

router.get("/imagingTests", async (req, res) => {
  try {
    const imagingTests = await ImagingTest.find({});
    res.status(200).json(imagingTests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching imaging tests" });
  }
});

module.exports = router;
