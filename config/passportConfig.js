const chalk = require('chalk');
const User = require('../models/User');



const passport = require('passport');
const oauthKeys = require('./oauthKeys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;







/* ----------------------------------------
.         Serialize and Deserialize
---------------------------------------- */
passport.serializeUser((user, done)=>{
  done(null, user.id);
})

passport.deserializeUser((id, done)=>{
  User.findById(id).then(user=> done(null, user));
})









/* ----------------------------------------
.               GOOGLE STRATEGY
---------------------------------------- */
passport.use( new GoogleStrategy(
  {
    clientID: oauthKeys.GOOGLE.clientID,
    clientSecret: oauthKeys.GOOGLE.clientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done)=>{
    console.log(chalk.red(JSON.stringify(profile)));

    User.findOne({ 'google.googleId': profile.id }).then(existingUser =>{
      if(existingUser) return done(null, existingUser);
      
        User.create({
          username: profile.displayName,
          profileImage: profile.photos[0].value,

          'google.googleId': profile.id,
          'google.email': profile.emails[0].value,

          'google.usename': profile.displayName,
          'google.profileImage': profile.photos[0].value,

          createdAt: new Date(),
        }).then(newUser=>{
          return done(null, newUser);
        })
      
    })
  }
))























/* ----------------------------------------
.               GITHUB STRATEGY
---------------------------------------- */
passport.use( new GithubStrategy(
  {
    clientID: oauthKeys.GITHUB.clientID,
    clientSecret: oauthKeys.GITHUB.clientSecret,
    callbackURL: '/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done)=>{
    console.log(chalk.red(JSON.stringify(profile)));

    User.findOne({ 'github.githubId': profile.id }).then(existingUser =>{
      if(existingUser) return done(null, existingUser);
      
        User.create({
          username: profile.displayName,
          profileImage: profile.photos[0].value,

          'github.githubId': profile.id,
          'github.email': profile.emails[0].value,

          'github.usename': profile.displayName,
          'github.profileImage': profile.photos[0].value,

          createdAt: new Date(),
        }).then(newUser=>{
          return done(null, newUser);
        })
      
    })
  }
))


