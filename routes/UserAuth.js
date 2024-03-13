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
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    const OTP = generateSecureRandomNumber(1000, 9999);
    try {
        const mailOptions = {
            from: process.env.COMPANY_EMAIL,
            to: email,
            subject: 'OTP Verification for SREC Legal Laws App',
            text: `Your OTP verification is: ${OTP}`
        };
        transporter.sendMail(mailOptions, async (err, info) => {
            if (!err) {
                return res.status(200).send({ message: 'OTP sent to your mail successfully. Check both your inbox and spam' });
            } else {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        })
    } catch (error) {
        next(error);
    }
});


router.post("/register", async (req, res, next) => {
    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;
        const existingUser = await UserSchema.findOne({ email: email });
        if (existingUser) {
            res.status(409).send({ message: "E-Mail already exists" });
            return;
        }
        const newUser = new UserSchema({ firstName, lastName, email, phoneNumber, password });
        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
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

router.use(ErrorHandler);

module.exports = router;