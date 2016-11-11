app.controller('NavController', NavController);

function NavController($http) {
  var ctrl = this;

  ctrl.logout = function () {
    $http.post('/logout', {}).then(function (response) {
      if (response.status === 200) {
        window.location.href = '/login';
      } else {
        console.log('error logging out');
      }
    });
  };
}
