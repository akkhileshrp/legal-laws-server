const express = require("express");
const router = express.Router();
const ErrorHandler = require("../middleware/errorMiddleware");
const ContactSchema = require("../models/contactSchema");

router.post("/", async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        const contactData = new ContactSchema({ name, email, message });
        await contactData.save();
        return res.status(201).send({ message: "Thank You for reaching out!" });
    } catch (error) {
        next(error);
    }
});

router.use(ErrorHandler);

module.exports = router;