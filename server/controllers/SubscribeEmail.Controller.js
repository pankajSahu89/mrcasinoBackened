const SubscribedEmail = require("../models/SubscribeEmail.Model");


exports.subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if already exists
    const existing = await SubscribedEmail.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const savedEmail = await SubscribedEmail.create({ email });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: savedEmail,
    });
  } catch (error) {
    console.error("Subscribe Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe",
    });
  }
};

// ✅ GET: Admin get all emails
exports.getAllSubscribedEmails = async (req, res) => {
  try {
    const emails = await SubscribedEmail.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: emails.length,
      data: emails,
    });
  } catch (error) {
    console.error("Fetch Emails Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscribed emails",
    });
  }
};
