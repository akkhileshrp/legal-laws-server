const express = require('express');
const UserSchema = require('../models/userSchema');
const ErrorHandler = require('../middleware/errorMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
require('dotenv').config();

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