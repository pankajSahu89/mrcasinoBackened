// models/SEO.model.js
const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
    // Store the main SEO state object
    seoConfig: {
        type: Object,
        required: true,
        default: {
            title: "Default Title",
            description: "Default Description",
            keywords: "default, seo, keywords",
            canonical: "http://example.com",
            robotsIndex: "index",
            robotsFollow: "follow",
            selectedSchema: "WebSite",
            focusKeyword: "",
            // Add other fields from your React state here
        },
    },

    // Store the FAQ array
    faqs: {
        type: [
            {
                question: { type: String, trim: true },
                answer: { type: String, trim: true },
            },
        ],
        default: [],
    },

    // Store the Hreflang array
    hreflangs: {
        type: [
            {
                lang: { type: String, trim: true },
                url: { type: String, trim: true },
            },
        ],
        default: [],
    },

    // A field to ensure only one document exists (Singleton Pattern)
    isCurrent: {
        type: Boolean,
        default: true,
        unique: true,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("SEO", seoSchema);