const router = require('express').Router();
const passport = require('passport');




router.get('/auth/logout', (req, res)=>{
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












module.exports = router;