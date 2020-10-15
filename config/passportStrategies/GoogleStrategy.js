

const User = require('../../models/User');
const Strategy = require('passport-google-oauth20').Strategy;







module.exports = GoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },





  (accessToken, refreshToken, profile, done)=>{
  



    User.findOne({ 'google.googleId': profile.id }).then(existingUser =>{
    
    
      // if the user already exists, retrieve the account
      if(existingUser) return done(null, existingUser);
      



      // if the user does not exists, create new account
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
)