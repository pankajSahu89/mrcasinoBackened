const Color = require("../models/Color.Model");

// Add a new color
exports.addColor = async (req, res) => {
  try {
    const { variable, hexCode } = req.body;

    if (!variable || !hexCode) {
      return res.status(400).json({ message: "Variable and hex code are required" });
    }

    const existing = await Color.findOne({ variable });
    if (existing) {
      return res.status(400).json({ message: "Color variable already exists" });
    }

    const newColor = new Color({ variable, hexCode });
    await newColor.save();

    res.status(201).json({ message: "Color added successfully", color: newColor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit a color by ID
exports.editColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { variable, hexCode } = req.body;

    const color = await Color.findById(id);
    if (!color) return res.status(404).json({ message: "Color not found" });

    if (variable) color.variable = variable;
    if (hexCode) color.hexCode = hexCode;

    await color.save();
    res.json({ message: "Color updated successfully", color });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a color by ID
exports.deleteColor = async (req, res) => {
  try {
    const { id } = req.params;

    const color = await Color.findByIdAndDelete(id);
    if (!color) return res.status(404).json({ message: "Color not found" });

    res.json({ message: "Color deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all colors
exports.getColors = async (req, res) => {
  try {
    const colors = await Color.find().sort({ createdAt: -1 });
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
