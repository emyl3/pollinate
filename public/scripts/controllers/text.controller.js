app.controller('TextController', TextController);

function TextController($http) {
  var ctrl = this;

  ctrl.submit = function (phone) {
    var data = { phone: '+1' + phone };
    $http.post('/twilioroute/signup', data).then(function (response) {
      if (response.data.code === 21450) {
        ctrl.alertType = 'alert alert-info';
        ctrl.error = 'This phone number is already verified and ready to receive affirmations.';
        return;
      } else if (response.data.code === 400) {
        ctrl.alertType = 'alert alert-danger';
        ctrl.error = 'Please enter a valid phone number in the following format XXX-XXX-XXXX.';
        return;
      } else {
        ctrl.alertType = 'alert alert-success';
        ctrl.success = response.data.validation_code;
        return;
      }
    });
  };

  ctrl.close = function () {
    ctrl.success = false;
    ctrl.error = false;
  };
}
