const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));

module.exports = router;
