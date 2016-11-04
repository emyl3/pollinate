app.controller('SendFlowerModalController', SendFlowerModalController);

function SendFlowerModalController($uibModalInstance, flower, flowerId) {
  var ctrl = this;

  ctrl.submitForm = function (phone, message) {
    console.log(phone);
    console.log(message);
  }
  // flower.getReward(flowerId).then(function (response) {
  //   ctrl.url = response[0].url;
  // });

  ctrl.close = function () {
    $uibModalInstance.close();
  };
}
