angular.module('pollenApp')
.controller('RegisterController', RegisterController);

function RegisterController($http, $location) {
  var ctrl = this;

  ctrl.register = function () {
    $http.post('/register', {
      username: ctrl.username,
      password: ctrl.password,
    }).then(function () {
      ctrl.success = true;
      ctrl.error = false;
      ctrl.status = 'alert alert-success';
    }, function (error) {

      ctrl.error = true;
      ctrl.success = false;
      ctrl.status = 'alert alert-danger';
    });
  };

  ctrl.close = function () {
    ctrl.success = false;
    ctrl.error = false;
  };
}
