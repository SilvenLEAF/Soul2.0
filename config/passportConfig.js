const chalk = require('chalk');
const User = require('../models/User');



const passport = require('passport');
const oauthKeys = require('./oauthKeys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;







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
















/* ----------------------------------------
.               FACEBOOK STRATEGY
---------------------------------------- */
passport.use( new FacebookStrategy(
  {
    clientID: oauthKeys.FACEBOOK.clientID,
    clientSecret: oauthKeys.FACEBOOK.clientSecret,
    callbackURL: '/auth/facebook/callback'
  },
  (accessToken, refreshToken, profile, done)=>{
    console.log(chalk.red(JSON.stringify(profile)));

    User.findOne({ 'facebook.facebookId': profile.id }).then(existingUser =>{
      if(existingUser) return done(null, existingUser);
      
        User.create({
          username: profile.displayName,
          // profileImage: profile.photos[0].value,

          'facebook.facebookId': profile.id,

          'facebook.usename': profile.displayName,
          // 'facebook.profileImage': profile.photos[0].value,

          createdAt: new Date(),
        }).then(newUser=>{
          return done(null, newUser);
        })
      
    })
  }
))













/* ----------------------------------------
.               SIGNUP STRATEGY
---------------------------------------- */
 

passport.use('local-signup', 
  new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
      const { username } = req.body;
      
      User.findOne({ 'local.email' :  email }, (err, user) => {
        // if there are any errors, return the error
        if (err)
          return done(err);

        // check to see if theres already a user with that email
        if (user) 
          return done({ msg: `This email is already taken` }, null);
        

          // const newUser = new User();
          // newUser.local.email = email;
          // newUser.local.password = newUser.generateHash(password);

          // newUser.save(err =>{
          //   if(err) throw err;

          //   return done(null, newUser)
          // })
        console.log(`The request body is \n`, req.body)
        User.create({
          'local.email': email,
          'local.password': password,
          createdAt: new Date(),
          username,
        }).then(newUser => {
          return done(null, newUser);
        })             
       

    });

  }));










/* ----------------------------------------
.               LOGIN STRATEGY
---------------------------------------- */