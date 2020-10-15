

const User = require('../../models/User');
const Strategy = require('passport-github').Strategy;







module.exports = GithubStrategy = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
  },





  (accessToken, refreshToken, profile, done)=>{
  


    User.findOne({ 'github.githubId': profile.id }).then(existingUser =>{


      // if the user already exists, retrieve the account
      if(existingUser) return done(null, existingUser);
      


      

      // if the user does not exists, create new account
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
)