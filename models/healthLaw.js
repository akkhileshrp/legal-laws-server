const mongoose = require("mongoose");

const healthlawSchema = mongoose.Schema({
    chapter: { type: Number, required: true },
    chapter_title: { type: String, required: true },
    section: { type: Number, required: true },
    section_title: { type: String, required: true },
    section_desc: { type: String, required: true },
});

const healthlawModel = mongoose.model("healthlaws", healthlawSchema);

module.exports = healthlawModel;