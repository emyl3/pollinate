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
      flower.deleteUsedFlower(userId, flowerId).then(function (response) {
        flower.getUserFlowers(userId);
              ctrl.close();
      })
    });

    console.log(phone);
    console.log(message);
  };

  ctrl.close = function () {
    $uibModalInstance.close();
  };
}
