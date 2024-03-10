const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const userAuth = require('./routes/UserAuth');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use('/auth', userAuth);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connection established successfully"))
    .catch((err) => console.error(err));

app.listen(process.env.PORT, (err) => {
    if (!err)
        console.log("Server is up and running");
    else
        console.error(err);
});