app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
            templateUrl: 'views/plant.html',
            controller: 'PlantController as pCtrl',
          }).when('/garden', {
            templateUrl: 'views/garden.html',
            controller: 'GardenController as gCtrl',
          }).when('/grow', {
            templateUrl: 'views/grow.html',
            controller: 'GrowController as gCtrl',
          }).when('/plant', {
            templateUrl: 'views/plant.html',
            controller: 'PlantController as pCtrl',
          }).otherwise({
            redirectTo: '/home',
          });

  $locationProvider.html5Mode(true);
});
