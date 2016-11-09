app.controller('SendFlowerModalController', SendFlowerModalController);

function SendFlowerModalController($uibModalInstance, flower, flowerId, flowerUrl, userData, $http) {
  var ctrl = this;
  ctrl.flowerId = flowerId;
  ctrl.flowerUrl = flowerUrl;
  ctrl.isCollapsed = false;

  flower.getReward(flowerId).then(function (response) {
    console.log('response', response);
    ctrl.url = response[0].url;
    console.log(ctrl.url);
  });

  userData.getUserId().then(function (response) {
    ctrl.userId = response;
  });

  ctrl.submitForm = function (phone, message, userId, flowerId) {
    var data = { phone: phone, message: message, flowerUrl: flowerUrl };
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

  ctrl.submitRegistration = function (phone) {
    var data = { phone: '+1' + phone };
    $http.post('/twilioroute/signup', data).then(function (response) {
      console.log(response);
      if (response.data.status === 400) {
        ctrl.code = response.data.message;
        return;
      } else if (response.data.code === 400) {
        ctrl.code = response.data.message;
      } else {
        ctrl.code = response.data.validation_code;
      }
    });
  };

  ctrl.close = function () {
    location.reload();
    $uibModalInstance.close();
  };
}
