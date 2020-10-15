

const passport = require('passport');








const SignupStrategy = require('./passportStrategies/SignupStrategy');
const LoginStrategy = require('./passportStrategies/LoginStrategy');
const FacebookStrategy = require('./passportStrategies/FacebookStrategy');
const GithubStrategy = require('./passportStrategies/GithubStrategy');
const GoogleStrategy = require('./passportStrategies/GoogleStrategy');








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
passport.use( GoogleStrategy )




/* ----------------------------------------
.               GITHUB STRATEGY
---------------------------------------- */
passport.use(GithubStrategy)




/* ----------------------------------------
.               FACEBOOK STRATEGY
---------------------------------------- */
passport.use(FacebookStrategy)



/* ----------------------------------------
.               SIGNUP STRATEGY
---------------------------------------- */
passport.use('local-signup', SignupStrategy);



/* ----------------------------------------
.               LOGIN STRATEGY
---------------------------------------- */
passport.use('local-login', LoginStrategy);
