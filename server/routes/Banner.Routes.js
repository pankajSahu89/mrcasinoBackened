const express = require("express");
const router = express.Router();

const {
  createBanner,
  getBanners,
  deleteBanner,
} = require("../controllers/Banner.controller");

// Routes
router.post("/", createBanner);       // POST Banner
router.get("/", getBanners);           // GET Banners
router.delete("/:id", deleteBanner);   // DELETE Banner

module.exports = router;
