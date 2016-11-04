app.controller('RewardModalController', RewardModalController);

function RewardModalController($uibModalInstance, flower, flowerId) {
  var ctrl = this;

  flower.getReward(flowerId).then(function (response) {
    ctrl.url = response[0].url;
  });

  ctrl.close = function () {
    $uibModalInstance.close();
  };
}
