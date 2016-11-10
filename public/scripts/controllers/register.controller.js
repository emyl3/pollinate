angular.module('pollenApp')
.controller('RegisterController', RegisterController);

function RegisterController($http, $location) {
  console.log('RegisterController loaded');
  var ctrl = this;

  ctrl.register = function () {
    console.log('registering new user');
    $http.post('/register', {
      username: ctrl.username,
      password: ctrl.password,
    }).then(function () {
      ctrl.success = true;
      ctrl.status = 'alert alert-success';
    }, function (error) {

      ctrl.error = true;
      ctrl.status = 'alert alert-danger';
    });
  };

  ctrl.close = function () {
    ctrl.success = false;
    ctrl.error = false;
  };
}
