app.controller('NavController', NavController);

function NavController($http, $location) {
  var ctrl = this;
  var location = $location.url();
  determineHeader(); //edit

  ctrl.logout = function () {
    $http.post('/logout', {}).then(function (response) {
      if (response.status === 200) {
        window.location.href = '/login';
      } else {
        console.log('error logging out');
      }
    });
  };

  //needs to be edited to include other header options

  function determineHeader() {
    console.log(location);
    if (location === '/home' || '/plant') {
      ctrl.headerImage = 'assets/pollinatelogo-02.svg';
    }
  }
}
