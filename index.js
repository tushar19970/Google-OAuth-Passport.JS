require('dotenv').config()
const express = require("express");
const app = express();
const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth2").Strategy
app.use(passport.initialize());

require('./database/db')
const google=express.Router()
app.use("/",google)
require("./Auth/google")(app,passport)

const home = require('./routes/router')
app.use('/', home)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Connected to database on PORT ${PORT}`);
});


