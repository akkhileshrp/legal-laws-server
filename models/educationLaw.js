const mongoose = require("mongoose");

const educationLawSchema = mongoose.Schema({
    chapter: { type: Number, required: true },
    chapter_title: { type: String, required: true },
    section: { type: Number, required: true },
    section_title: { type: String, required: true },
    section_desc: { type: String, required: true },
});

const educationLawModel = mongoose.model("educationlaws", educationLawSchema);

module.exports = educationLawModel;