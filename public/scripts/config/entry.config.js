app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
            templateUrl: 'views/entry/login.html',
            controller: 'LoginController as lCtrl',
          }).when('/login', {
            templateUrl: 'views/entry/login.html',
            controller: 'LoginController as lCtrl',
          }).when('/register', {
            templateUrl: 'views/entry/register.html',
            controller: 'RegisterController as rCtrl',
          }).otherwise({
            redirectTo: '/',
          });

  $locationProvider.html5Mode(true);
});
