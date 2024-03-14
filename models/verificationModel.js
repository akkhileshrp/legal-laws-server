const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const verificationModelSchema = mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true }
}, { timestamps: true });

verificationModelSchema.pre('save', async function (next) {
    const otpRequest = this;
    if (otpRequest.isModified('code')) {
        try {
            otpRequest.code = await bcrypt.hash(otpRequest.code, 8);
            next();
        } catch (error) {
            next(error);
        }
    } else next();
});

const verificationModel = mongoose.model('verifications', verificationModelSchema);

module.exports = verificationModel;