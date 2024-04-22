const express = require("express");
const router = express.Router();
const EducationLaws = require("../models/educationLaw");
const ErrorHandler = require("../middleware/errorMiddleware");
const CriminalLaws = require("../models/criminalLaw");
const CyberLaws = require("../models/cyberLaw");
const HealthLaws = require("../models/healthLaw");
const LabourLaws = require("../models/labourLaw");
const PropertyLaws = require("../models/propertyLaw");

// educational laws

router.get("/educationlaws", async (req, res, next) => {
    try {
        const data = await EducationLaws.find();
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        next(error);
    }
});

router.get("/educationlaws/:section_title", async (req, res, next) => {
    try {
        const regex = new RegExp(req.params.section_title, "i");
        const data = await EducationLaws.find({ section_title: { $regex: regex } });
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});

// criminal laws

router.get("/criminallaws", async (req, res, next) => {
    try {
        const data = await CriminalLaws.find();
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        next(error);
    }
});

router.get("/criminallaws/:section_title", async (req, res, next) => {
    try {
        const regex = new RegExp(req.params.section_title, "i");
        const data = await CriminalLaws.find({ section_title: { $regex: regex } });
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});

// cyber laws

router.get("/cyberlaws", async (req, res, next) => {
    try {
        const data = await CyberLaws.find();
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        next(error);
    }
});

router.get("/cyberlaws/:section_title", async (req, res, next) => {
    try {
        const regex = new RegExp(req.params.section_title, "i");
        const data = await CyberLaws.find({ section_title: { $regex: regex } });
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});

// health laws

router.get("/healthlaws", async (req, res, next) => {
    try {
        const data = await HealthLaws.find();
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        next(error);
    }
});

router.get("/healthlaws/:section_title", async (req, res, next) => {
    try {
        const regex = new RegExp(req.params.section_title, "i");
        const data = await HealthLaws.find({ section_title: { $regex: regex } });
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});

// labour laws

router.get("/labourlaws", async (req, res, next) => {
    try {
        const data = await LabourLaws.find();
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        next(error);
    }
});

router.get("/labourlaws/:section_title", async (req, res, next) => {
    try {
        const regex = new RegExp(req.params.section_title, "i");
        const data = await LabourLaws.find({ section_title: { $regex: regex } });
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        next(error);
    }
});

// property laws

router.get("/propertylaws", async (req, res, next) => {
    try {
        const data = await PropertyLaws.find();
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        next(error);
    }
});

router.get("/propertylaws/:section_title", async (req, res, next) => {
    try {
        const regex = new RegExp(req.params.section_title, "i");
        const data = await PropertyLaws.find({ section_title: { $regex: regex } });
        return res.status(200).send({ length: data.length, data: data });
    } catch (error) {
        next(error);
    }
});

router.use(ErrorHandler);

module.exports = router;