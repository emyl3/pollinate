const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local'), function (req, res) {
  res.redirect('/user');
});

module.exports = router;
