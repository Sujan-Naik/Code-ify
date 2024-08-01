const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require("cookie-parser");
require('dotenv').config();


app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(bodyParser.json())

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))


const UserRoutes = require('./routes/userRoutes')

app.use('/api/user', UserRoutes)

const ShowcaseRoutes = require('./routes/showcaseRoutes')
const {memoryStorage} = require("multer");
const multer = require("multer");

app.use('/api/showcase', ShowcaseRoutes)

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))
