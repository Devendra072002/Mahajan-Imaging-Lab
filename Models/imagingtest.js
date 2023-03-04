const mongoose = require("mongoose");

const imagingTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const ImagingTest = mongoose.model("ImagingTest", imagingTestSchema);

module.exports = ImagingTest;
