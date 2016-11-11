const dotenv = require('dotenv');
dotenv.load();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const SECRET_KEY = process.env.SECRET_KEY;
// const logout = require('express-passport-logout');

const connection = require('./database/connection');
const login = require('./routes/login');
const register = require('./routes/register');
const auth = require('./authentication/setup');

const prompts = require('./routes/prompts');
const progress = require('./routes/progress');
const flowers = require('./routes/flowers');
const twilioroute = require('./routes/twilioroute');

auth.setup();

const user = require('./models/user');
const sessionConfig = {
  secret: SECRET_KEY, //TODO this should be read from ENV
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false,
  }
};

const app = express();

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', login);
app.use('/register', register);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/entry.html'));
});

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/entry.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/entry.html'));
});

app.get('/txtsignup', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/entry.html'));
});

app.use('/twilioroute', twilioroute);

app.use(ensureAuthenticated);

app.use('/prompts', prompts);
app.use('/progress', progress);
app.use('/flowers', flowers);

app.post('/logout', function(req, res){
  req.logOut();
  res.redirect("/");
});

app.get('/userInfo', function (req, res) {
  var user = req.user;
  res.send(user);
});

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/admin.html'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('server listening for requests on port:', server.address().port);
  console.log('press control+c to quit');
});
