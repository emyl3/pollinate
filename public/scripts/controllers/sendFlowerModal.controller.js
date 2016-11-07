app.controller('SendFlowerModalController', SendFlowerModalController);

function SendFlowerModalController($uibModalInstance, flower, flowerId, flowerUrl, userData, $http) {
  var ctrl = this;
  ctrl.flowerId = flowerId;
  ctrl.flowerUrl = flowerUrl;

  flower.getReward(flowerId).then(function (response) {
    console.log('response', response);
    ctrl.url = response[0].url;
    console.log(ctrl.url);
  });

  userData.getUserId().then(function (response) {
    ctrl.userId = response;
  })

  ctrl.submitForm = function (phone, message, userId, flowerId) {
    var data = { phone: phone, message: message };
    $http.post('/twilioroute', data).then(function (response) {
      console.log(userId);
      console.log(flowerId);
      flower.deleteUsedFlower(userId, flowerId).then(function (response) {
        ctrl.close();
      });
    });

    console.log(phone);
    console.log(message);
  };

  ctrl.close = function () {
    location.reload();
    $uibModalInstance.close();
  };
}
