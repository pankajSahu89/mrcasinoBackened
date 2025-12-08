const mongoose = require("mongoose");

const subscribeEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubscribedEmail", subscribeEmailSchema);
