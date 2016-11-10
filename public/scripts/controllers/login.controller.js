angular.module('pollenApp')
       .controller('LoginController', LoginController);

function LoginController($http, $location) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.login = function () {
    console.log('logging in');
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

        ctrl.closeAlert = function () {
          ctrl.error = false;
        }
        console.log('error logging in', error);
      });
    });
  };
}
