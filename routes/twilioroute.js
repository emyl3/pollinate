const router = require('express').Router();
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.load();

const TWILIO_ACC = process.env.TWILIO_ACC_SID;
const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
var client = twilio(TWILIO_ACC, TWILIO_AUTH);

router.post('/', function (req, res) {
  var phone = req.body.phone;
  var message = req.body.message;
  var url = req.body.flowerUrl;

  // client.outgoingCallerIds.create({
  //   phoneNumber: '+1' + phone,
  // }, function (err, callerId) {
  //   process.stdout.write(callerId.sid);
  //   return
  // });
  //
  // promise.then(function (response) {
  //   console.log('success adding', response);
  // }, function (error) {
  //
  //   console.log('failure adding,', error);
  // });
      client.sendMessage({
        to: '+1' + phone,
        from: '+' + TWILIO_NUMBER,
        body: message + ' Replies to this number will not work.',
        MediaUrl: url,
      });


  res.sendStatus(200);
});

module.exports = router;
