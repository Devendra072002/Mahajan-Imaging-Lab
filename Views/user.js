const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/users", async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;
    const user = new User({ username, email, phone_number, password });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User creation failed" });
  }
});

module.exports = router;
