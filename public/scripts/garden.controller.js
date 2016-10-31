app.controller('GardenController', GardenController);

function GardenController() {
  var $scope = this;
  $scope.bigData = {};

    $scope.bigData.breakfast = false;
    $scope.bigData.lunch = false;
    $scope.bigData.dinner = false;

    // COLLAPSE =====================
    $scope.isCollapsed = false;

}
