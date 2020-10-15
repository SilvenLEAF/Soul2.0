

const User = require('../../models/User');
const Strategy = require('passport-facebook').Strategy;







module.exports = FacebookStrategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback'
  },



  (accessToken, refreshToken, profile, done)=>{
    

    User.findOne({ 'facebook.facebookId': profile.id }).then(existingUser =>{
      

      // if the user already exists, retrieve that account
      if(existingUser) return done(null, existingUser);
      
      

      // if the user does not exist, create new account
      User.create({
        username: profile.displayName,        

        'facebook.facebookId': profile.id,
        'facebook.usename': profile.displayName,
        

        createdAt: new Date(),
      }).then(newUser=>{
        return done(null, newUser);
      })
    

    })
  }
)