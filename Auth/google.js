require('dotenv').config()
const GoogleStrategy = require("passport-google-oauth2").Strategy

module.exports=(app,passport) => {
const express = require('express')
const router = express.Router()
const app1 = express()
app1.use(express.json())
const knex = require('../database/db')
    var data = {};
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET ,
        callbackURL: process.env.CALL_BACK_URL,
        passReqToCallback: true,
    },

    (request, accessToken, refreshToken, profile, done) => {
        data["name"] = profile.displayName;
        data["image_url"] = profile._json.picture;
        data["email"] = profile._json.email;
        done(null, profile);
        console.log(data)
        const data1 = {
            name:profile.displayName,
            email:profile._json.email,
            image_url:profile._json.picture
        }
            knex('google').insert(data1).then((data) => {
                console.log('inserted')
            })
            
    }));

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        app.get('/', (req, res) => {
            res.send('<a href="/auth/google">Authentication With Google</a>')
        })

        app.get("/auth/google",passport.authenticate("google", {scope: ["profile",'email']}));

        app.get("/google/callback", passport.authenticate("google"), (req, res) => {
        res.send("<center><h1>Welcome To My Site " + data.name + "</h1><img src=" + data.image_url + "></img></center>");
        });
}


