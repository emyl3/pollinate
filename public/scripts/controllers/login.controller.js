angular.module('pollenApp')
       .controller('LoginController', LoginController);

function LoginController($http, $location) {
  var ctrl = this;

  ctrl.login = function () {
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password,
    }).then(function () {
      $http({
        method: 'GET',
        url: '/userInfo',
      }).then(function (res) {
        var adminStatus = res.data.admin;
        if (adminStatus === true) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/home';
        }
      }, function (error) {

        ctrl.error = true;
      });
    });
  };

  ctrl.closeAlert = function () {
    ctrl.error = false;
  };
}
