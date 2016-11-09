app.controller('TextController', TextController);

function TextController($http) {
  var ctrl = this;
  console.log('textcontroller loaded');

  ctrl.submit = function (phone) {
    var data = { phone: '+1' + phone };
    $http.post('/twilioroute/signup', data).then(function (response) {
      console.log(response);
      if (response.data.status === 400) {
        ctrl.code = response.data.message;
        return;
      } else if (response.data.code === 400) {
        ctrl.code = response.data.message;
      } else {
        ctrl.code = response.data.validation_code;
      }
    });
  };
}
