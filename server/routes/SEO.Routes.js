// routes/SEO.Routes.js
const express = require("express");
const router = express.Router();
const { getSEOConfig, updateSEOConfig } = require("../controllers/SEO.controller");
// const { auth, isAdmin } = require("../middlewares/auth.middleware"); // Assuming you have auth middleware

// Public route to fetch SEO data for the frontend (to render the tags)
router.get("/config", getSEOConfig);

// Protected route to save/update the SEO data (Requires Admin privileges)
// router.post("/config", auth, isAdmin, updateSEOConfig); 
router.post("/config", updateSEOConfig); // Using unprotected for immediate testing

module.exports = router; 