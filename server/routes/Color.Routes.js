const express = require("express");
const router = express.Router();
const colorController = require("../controllers/Color.Controller");

router.post("/colors", colorController.addColor);
router.put("/colors/:id", colorController.editColor);
router.delete("/colors/:id", colorController.deleteColor);
router.get("/colors", colorController.getColors);

module.exports = router;
