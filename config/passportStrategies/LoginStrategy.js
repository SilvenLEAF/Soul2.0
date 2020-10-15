

const User = require('../../models/User');
const Strategy = require('passport-local').Strategy;







module.exports = LoginStrategy = new Strategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },




  (req, email, password, done) => {

    User.findOne({ 'local.email' :  email }, (err, user) => {
      // if there are any errors, return the error before anything else
      if (err) return done(err);

      

      // if the user does not exist
      if (!user) return done({ msg: `No user found` }, null);

      

      // if the password does not match
      if (user.local.password !== password) return done({ msg: `Invalid credentials` }, null);



      return done(null, user);
    });

  }
)