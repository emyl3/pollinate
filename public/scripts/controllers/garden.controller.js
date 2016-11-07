app.controller('GardenController', GardenController);

function GardenController(userData, flower, $uibModal) {
  var ctrl = this;

  userData.getUserId().then(function (response) {
    flower.getUserFlowers(response).then(function (response) {
      console.log(response);

      ctrl.flowers = response;
    });
  });

  ctrl.openModal = function (flowerId, flowerUrl) {
    console.log('flower id', flowerId);
    var modalInstance = $uibModal.open({
      templateUrl: 'views/partials/sendFlowerModal.html',
      controller: 'SendFlowerModalController as sCtrl',
      resolve: {
        flowerId: function () {
          return flowerId;
        },
        flowerUrl: function () {
          return flowerUrl;
        },
      },
    });
  };
}
