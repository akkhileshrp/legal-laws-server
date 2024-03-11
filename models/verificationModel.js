const mongoose = require('mongoose');

const verificationModelSchema = mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true }
}, { timestamps: true });

const verificationModel = mongoose.model('verifications', verificationModelSchema);

module.exports = verificationModel;