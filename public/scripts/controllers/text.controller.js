app.controller('TextController', TextController);

function TextController($http) {
  var ctrl = this;

  ctrl.submit = function (phone) {
    var data = { phone: '+1' + phone };
    $http.post('/twilioroute/signup', data).then(function (response) {
      if (response.data.code === 21450) {
        ctrl.alertType = 'alert alert-info';
        ctrl.alertStatus = 'This phone number is already verified and ready to receive affirmations.';
        return;
      } else if (response.data.code === 400) {
        ctrl.alertType = 'alert alert-danger';
        ctrl.alertStatus = 'Please enter a valid phone number in the following format XXX-XXX-XXXX.';
        return;
      } else {
        ctrl.alertType = 'alert alert-success';
        ctrl.alertStatus = 'Please enter the following verification code: ' + response.data.validation_code + ' when prompted by a phone call from 415-723-4000.';
        return;
      }
    });
  };

  ctrl.close = function () {
    ctrl.alertStatus = false;
  };
}
