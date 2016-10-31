const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const passport = require('passport');
// const session = require('express-session');

const connection = require('./database/connection');
// const login = require('./routes/login');
// const register = require('./routes/register');
// const auth = require('./authentication/setup');
//
// auth.setup();

// const user = require('./models/user');
// const sessionConfig = {
//   secret: 'super secret key goes here', //TODO this should be read from ENV
//   key: 'user',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 30 * 60 * 1000,
//     secure: false
//   }
// };

const app = express();

// app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/login', login);
// app.use('/register', register);

// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname, 'public/views/index.html'));
// });
//
// app.use(ensureAuthenticated);
//
// app.get('/supersecret', function(req, res){
//   res.send('the password is banana');
// })

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// }

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('server listening for requests on port:', server.address().port);
  console.log('press control+c to quit');
});
