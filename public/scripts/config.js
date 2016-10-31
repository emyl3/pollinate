app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/user/plant', {
            templateUrl: 'views/plant.html',
            controller: 'PlantController as pCtrl',
          }).when('/user/grow', {
            templateUrl: 'views/grow.html',
            controller: 'GrowController as gCtrl',
          }).when('/user/garden', {
            templateUrl: 'views/garden.html',
            controller: 'GardenController as gCtrl',
          }).otherwise({
            redirectTo: '/login',
          });

  $locationProvider.html5Mode(true);
});
