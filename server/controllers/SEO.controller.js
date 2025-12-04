// controllers/SEO.controller.js
const SEO = require("../models/SEO.model"); // Adjust path as necessary

// Helper to find the single SEO document
const findCurrentSEO = async () => {
    // Find the single document with isCurrent: true, or create it if it doesn't exist
    let seoDoc = await SEO.findOne({ isCurrent: true });

    if (!seoDoc) {
        console.log("Creating new initial SEO document.");
        seoDoc = await SEO.create({ isCurrent: true });
    }
    return seoDoc;
};

// @desc    Get the current SEO configuration
// @route   GET /api/seo/config
// @access  Public (or Admin if you want to protect it)
exports.getSEOConfig = async (req, res) => {
    try {
        const seoDoc = await findCurrentSEO();

        res.status(200).json({
            success: true,
            data: {
                seo: seoDoc.seoConfig,
                faqs: seoDoc.faqs,
                hreflangs: seoDoc.hreflangs,
            },
        });
    } catch (error) {
        console.error("Error fetching SEO config:", error);
        res.status(500).json({ success: false, message: "Server error while fetching SEO configuration." });
    }
};

// @desc    Update or create the SEO configuration
// @route   POST /api/seo/config
// @access  Private (Admin access required) - Add auth middleware here
exports.updateSEOConfig = async (req, res) => {
    // NOTE: You must add an authentication middleware (e.g., isAdmin) to this route
    const { seo, faqs, hreflangs } = req.body;

    if (!seo || !faqs || !hreflangs) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields (seo, faqs, hreflangs) in request body." 
        });
    }
    
    try {
        let seoDoc = await findCurrentSEO();

        // Update the fields
        seoDoc.seoConfig = seo;
        seoDoc.faqs = faqs;
        seoDoc.hreflangs = hreflangs;
        seoDoc.updatedAt = Date.now();

        await seoDoc.save();

        res.status(200).json({
            success: true,
            message: "SEO configuration saved successfully.",
            data: {
                seo: seoDoc.seoConfig,
                faqs: seoDoc.faqs,
                hreflangs: seoDoc.hreflangs,
            },
        });

    } catch (error) {
        console.error("Error saving SEO config:", error);
        res.status(500).json({ success: false, message: "Server error while saving SEO configuration." });
    }
};