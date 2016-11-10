const router = require('express').Router();
const User = require('../models/user');

router.post('/', function (req, res) {
  User.create(req.body.username, req.body.password).then(function () {
    res.sendStatus(201);
  }).catch(function (err) {
    res.sendStatus(500);
  });
});

module.exports = router;
