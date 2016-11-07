app.service('twilioservice', TwilioService);

function TwilioService() {

  //
  // function sendMessage (data) {
  //   return client.sendMessage({
  //     to: data.number,
  //     from: '+12012920629',
  //     body: data.message + ' Replies to this number will not work.',
  //   });
  // }



  return {
    // sendMessage: sendMessage,
  };
}
