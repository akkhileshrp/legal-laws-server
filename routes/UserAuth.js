const express = require('express');
const UserSchema = require('../models/userSchema');
const ErrorHandler = require('../middleware/errorMiddleware');
const router = express.Router();

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

router.use(ErrorHandler);

module.exports = router;