const express = require("express");
const router = express.Router();
const {
  createVisitorLog,
  getAllVisitorLogs,
} = require("../controllers/VisitorLog.Controller");

// ✅ POST - Save new visitor
router.post("/", createVisitorLog);

// ✅ GET - Admin get all logs
router.get("/", getAllVisitorLogs);

module.exports = router;
