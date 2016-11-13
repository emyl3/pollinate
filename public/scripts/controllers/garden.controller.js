app.controller('GardenController', GardenController);

function GardenController(userData, flower, $uibModal) {
  var ctrl = this;

  userData.getUserId().then(function (response) {
    flower.getUserFlowers(response).then(function (response) {
      if (response.length === 0) {
        ctrl.emptyRewards = true;
      } else {
        ctrl.flowers = response;
      }
    });
  });

  ctrl.openModal = function (flowerId, flowerUrl) {
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
