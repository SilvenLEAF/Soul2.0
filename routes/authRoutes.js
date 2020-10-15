const router = require('express').Router();
const passport = require('passport');




router.get('/logout', (req, res)=>{
  req.logOut();
  res.redirect('/');
})









/* --------------------------------------
.                  GOOGLE
-------------------------------------- */
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))




router.get('/google/callback',
  passport.authenticate('google'),
  (req, res)=>{
    res.redirect('/');
  }
)









/* --------------------------------------
.                  GITHUB
-------------------------------------- */
router.get('/github', passport.authenticate('github'))




router.get('/github/callback',
  passport.authenticate('github'),
  (req, res)=>{
    res.redirect('/');
  }
)





/* --------------------------------------
.                  Facebook
-------------------------------------- */
router.get('/facebook', passport.authenticate('facebook'))




router.get('/facebook/callback',
  passport.authenticate('facebook'),
  (req, res)=>{
    res.redirect('/');
  }
)














/* --------------------------------------
.                  Signup
-------------------------------------- */
router.post('/signup', (req, res, next)=>{
  passport.authenticate('local-signup', (err, user, info)=>{
    if(err) {
      console.log( `Error on the route`, err);
      return res.json(err);
    }

    console.log(`User on the route`, user)
    req.logIn(user, (err)=>{
      if(err) return res.status(500).json({ msg: err.message || `Oops, something went wrong` })

      return res.json(user);
    })
    
  })(req, res, next)
});









/* --------------------------------------
.                  Login
-------------------------------------- */
router.post('/login', (req, res, next)=>{
  passport.authenticate('local-login', (err, user, info)=>{
    if(err) {
      console.log( `Error on the route`, err);
      return res.json(err);
    }

    console.log(`User on the route`, user)
    req.logIn(user, (err)=>{
      if(err) return res.status(500).json({ msg: err.message || `Oops, something went wrong` })

      return res.json(user);
    })
    
  })(req, res, next)
});










module.exports = router;