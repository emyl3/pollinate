const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.load();

const twilio = require('twilio');

const TWILIO_ACC = process.env.TWILIO_ACC_SID;
const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN;
var client = twilio(TWILIO_ACC, TWILIO_AUTH);

router.post('/', function(req, res){
  var phone = req.body.phone;
  var message = req.body.message;
  var url = req.body.flowerUrl;
  console.log(url);
  console.log('posting');

  client.sendMessage({
    to: '+1' + phone,
    from: '+12012920629',
    body: message + ' Replies to this number will not work.',
    MediaUrl: url,
  });
  res.sendStatus(200);
});

module.exports = router;
