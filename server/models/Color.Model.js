const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
  {
    variable: {
      type: String,
      required: true,
      trim: true,
      unique: true, // ensures no duplicate variables
    },
    hexCode: {
      type: String,
      required: true,
      trim: true,
      match: /^#([0-9A-F]{3}){1,2}$/i, // ensures valid hex code like #000000
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Color", ColorSchema);
