const express = require('express');
const UserSchema = require('../models/userSchema');
const VerificationSchema = require('../models/verificationModel');
const ErrorHandler = require('../middleware/errorMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const generateSecureRandomNumber = require('../otp/randomNummber');
const router = express.Router();
require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.NODEMAILER_AUTH,
    }
});

router.post('/send-otp', async (req, res, next) => {
    const { email } = req.body;
    const OTP = generateSecureRandomNumber(10000, 99999);
    try {
        const mailOptions = {
            from: process.env.COMPANY_EMAIL,
            to: email,
            subject: 'OTP Verification for SREC Legal Laws App',
            html: `
                <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
                    <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                        <h2 style="color: #333;">OTP Verification for SREC Legal Laws App</h2>
                        <p style="color: #555;">Dear User,</p>
                        <p style="color: #555;">Your OTP verification code is: <strong>${OTP}</strong></p>
                        <p style="color: #555;">Please use this code to complete the verification process.</p>
                        <p style="color: #555;">If you did not request this OTP, please ignore this email.</p>
                        <p style="color: #555;">Best Regards,<br/>Sri Ramakrishna Engineering College</p>
                    </div>
                </div>
            `
        };
        const verification = new VerificationSchema({ email: email, code: OTP })
        verification.save();
        transporter.sendMail(mailOptions, async (err, info) => {
            if (!err) {
                return res.status(200).send({ message: 'OTP sent to your mail successfully. Check both your inbox and spam' });
            } else {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        });
    } catch (error) {
        next(error);
    }
});


router.post("/register", async (req, res, next) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, otp } = req.body;
        const existingUser = await UserSchema.findOne({ email: email });
        if (existingUser) {
            res.status(409).send({ message: "E-Mail already exists" });
            return;
        }
        const verificationQuery = await VerificationSchema.findOne({ email: email });
        if (!verificationQuery) {
            res.status(400).send({ message: 'Please send the OTP first' });
        }
        const otpMatch = await bcrypt.compare(otp, verificationQuery.code);
        if (otpMatch) {
            const newUser = new UserSchema({ firstName, lastName, email, phoneNumber, password });
            await newUser.save();
            await VerificationSchema.deleteOne({ email: email });
            res.status(201).send({ message: "User registered successfully" });
            return;
        } else {
            res.status(400).send({ message: 'Invalid OTP code' });
        }
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserSchema.findOne({ email: email });
        if (!user) {
            res.status(400).send({ message: "Incorrect username and password" });
            return;
        }
        const isUser = await bcrypt.compare(password, user.password);
        if (!isUser) {
            res.status(400).send({ message: "Invalid credentials" });
            return;
        }
        const authToken = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET, { expiresIn: "20m" });
        res.cookie("authToken", authToken, { httpOnly: true });
        res.status(200).send({ message: "Login successful", token: authToken });
    } catch (error) {
        next(error);
    }
});

router.post('/reset-password', async (req, res, next) => {
    try {
        const { email, password, otp } = req.body;
        const user = await UserSchema.findOne({ email: email });
        const verificationQuery = await VerificationSchema.findOne({ email: email });
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        }
        if (!verificationQuery) {
            res.status(400).send({ message: 'Please send the OTP first' });
        }
        const isMatch = await bcrypt.compare(otp, verificationQuery.code);
        if (isMatch) {
            user.password = password;
            await user.save();
            await VerificationSchema.deleteOne({ email: email });
            res.status(201).send({ message: 'Password changed successfully' });
            return;
        } else {
            res.status(400).send({ message: 'Invalid OTP code' });
        }
    } catch (error) {
        next(error);
    }
});

router.use(ErrorHandler);

module.exports = router;