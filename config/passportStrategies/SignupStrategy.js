

const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Strategy = require('passport-local').Strategy;







module.exports = SignupStrategy = new Strategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },



  (req, email, password, done) => {
    const { username } = req.body;
    
    User.findOne({ 'local.email' :  email }, (err, user) => {
      
      // if there are any errors, return the error
      if (err) return done(err);


      // check to see if theres already a user with that email
      if (user) return done({ msg: `This email is already taken` }, null);
      


      
      
      User.create({
        'local.email': email,
        'local.password': bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
        createdAt: new Date(),
        username,


      }).then(newUser => {        
        return done(null, newUser);

      })
     

    });

  }
)
