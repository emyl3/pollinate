app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController as lCtrl',
          }).when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController as lCtrl',
          }).when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController as rCtrl',
          }).otherwise({
            redirectTo: '/',
          });

  $locationProvider.html5Mode(true);
});
