const mongoose = require("mongoose");

const labourLawsSchema = mongoose.Schema({
    chapter: { type: Number, required: true },
    chapter_title: { type: String, required: true },
    section: { type: Number, required: true },
    section_title: { type: String, required: true },
    section_desc: { type: String, required: true },
});

const labourlawsModel = mongoose.model("labourlaws", labourLawsSchema);

module.exports = labourlawsModel;