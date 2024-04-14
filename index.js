const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const userAuth = require('./routes/UserAuth');
const lawsandregulations = require("./routes/LawsRoute");
const contact = require("./routes/Contact");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", userAuth);
app.use("/lawsandregulations", lawsandregulations);
app.use("/contact", contact);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connection established successfully"))
    .catch((err) => console.error(err));

app.listen(process.env.PORT, (err) => {
    if (!err)
        console.log("Server is up and running");
    else
        console.error(err);
});