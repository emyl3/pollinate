app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/plant', {
            templateUrl: 'views/plant.html',
            controller: 'PlantController as plantCtrl',
          }).when('/grow', {
            templateUrl: 'views/grow.html',
            controller: 'GrowController as growCtrl',
          }).when('/garden', {
            templateUrl: 'views/garden.html',
            controller: 'GardenController as gardenCtrl'
          // }).otherwise({
          //   redirectTo: '/plant',
          });

  $locationProvider.html5Mode(true);
});
