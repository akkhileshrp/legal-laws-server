const mongoose = require("mongoose");

const criminallawsSchema = mongoose.Schema({
    chapter: { type: Number, required: true },
    chapter_title: { type: String, required: true },
    section: { type: Number, required: true },
    section_title: { type: String, required: true },
    section_desc: { type: String, required: true },
});

const criminallawsModel = mongoose.model("criminallaws", criminallawsSchema);

module.exports = criminallawsModel;