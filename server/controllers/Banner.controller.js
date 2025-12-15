const Banner = require("../models/Banner.model");
const cloudinary = require("cloudinary").v2;

// ✅ CREATE BANNER (POST)
exports.createBanner = async (req, res) => {
  try {
    const { title, redirectUrl } = req.body;

    if (!title || !redirectUrl || !req.files?.image) {
      return res.status(400).json({
        success: false,
        message: "Title, redirect URL, and image are required",
      });
    }

    const image = req.files.image;

    const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "casino_banners",
    });

    const banner = await Banner.create({
      title,
      redirectUrl,
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    console.error("Create Banner Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create banner",
    });
  }
};

// ✅ GET ALL ACTIVE BANNERS
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};

// ✅ DELETE BANNER
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete banner",
    });
  }
};
