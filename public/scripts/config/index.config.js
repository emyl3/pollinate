app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
            templateUrl: 'views/index/plant.html',
            controller: 'PlantController as pCtrl',
          }).when('/garden', {
            templateUrl: 'views/index/garden.html',
            controller: 'GardenController as gCtrl',
          }).when('/grow', {
            templateUrl: 'views/index/grow.html',
            controller: 'GrowController as gCtrl',
          }).when('/plant', {
            templateUrl: 'views/index/plant.html',
            controller: 'PlantController as pCtrl',
          }).when('/nutrients', {
            templateUrl: 'views/index/nutrients.html',
            controller: 'NutrientController as nCtrl',
          }).otherwise({
            redirectTo: '/home',
          });

  $locationProvider.html5Mode(true);
});
