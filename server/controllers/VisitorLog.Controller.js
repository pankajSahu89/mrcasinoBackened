const VisitorLog = require("../models/VisitorLog");

// ✅ POST - Save Visitor Log
exports.createVisitorLog = async (req, res) => {
  try {
    const {
      ip,
      type,
      continent,
      continent_code,
      country,
      country_code,
      capital,
      city,
      postal,
      region,
      region_code,
      isp,
      org,
    } = req.body;

    const newLog = await VisitorLog.create({
      ip,
      type,
      continent,
      continent_code,
      country,
      country_code,
      capital,
      city,
      postal,
      region,
      region_code,
      isp,
      org,
    });

    res.status(201).json({
      success: true,
      message: "Visitor logged successfully",
      data: newLog,
    });
  } catch (error) {
    console.error("Visitor Log Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save visitor log",
    });
  }
};

// ✅ GET - Admin fetch all visitors
exports.getAllVisitorLogs = async (req, res) => {
  try {
    const logs = await VisitorLog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error("Get Visitor Logs Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get visitor logs",
    });
  }
};
