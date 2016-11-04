const dotenv = require('dotenv');
dotenv.load();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const twilio = require('twilio');

const connection = require('./database/connection');
const login = require('./routes/login');
const register = require('./routes/register');
const auth = require('./authentication/setup');

const prompts = require('./routes/prompts');
const progress = require('./routes/progress');
const flowers = require('./routes/flowers');

auth.setup();

const TWILIO_ACC = process.env.TWILIO_ACC_SID;
const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN;
var client = twilio(TWILIO_ACC, TWILIO_AUTH);
client.sendMessage({
  to: '+12015668084',
  from: '+12012920629',
  body: 'Hello from Twilio!'
});

client.sendMessage().then(function(){
  console.log('message sent');
});

const user = require('./models/user');
const sessionConfig = {
  secret: 'super secret key goes here', //TODO this should be read from ENV
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

app.use(ensureAuthenticated);

app.get('/userInfo', function (req, res) {
  var user = req.user;
  res.send(user);
});

app.use('/prompts', prompts);
app.use('/progress', progress);
app.use('/flowers', flowers);

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
