const mongoose = require("mongoose");

const visitorLogSchema = new mongoose.Schema(
  {
    ip: { type: String },
    type: { type: String }, // IPv4 / IPv6
    continent: { type: String },
    continent_code: { type: String },

    country: { type: String },
    country_code: { type: String },

    capital: { type: String },
    city: { type: String },

    postal: { type: String },

    region: { type: String },
    region_code: { type: String },

    isp: { type: String },
    org: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisitorLog", visitorLogSchema);
