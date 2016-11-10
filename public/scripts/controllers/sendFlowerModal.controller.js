app.controller('SendFlowerModalController', SendFlowerModalController);

function SendFlowerModalController($uibModalInstance, flower, flowerId, flowerUrl, userData, $http) {
  var ctrl = this;
  ctrl.flowerId = flowerId;
  ctrl.flowerUrl = flowerUrl;
  ctrl.isCollapsed = false;

  ctrl.open = function () {
    ctrl.isCollapsed = !ctrl.isCollapsed;
  };

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
      if (response.data.code === 21450) {
        ctrl.alertType = 'alert alert-info';
        ctrl.alertCode = 'This phone number is already verified and ready to receive affirmations.';
        return;
      } else if (response.data.code === 400) {
        ctrl.alertType = 'alert alert-danger';
        ctrl.alertCode = 'Please enter a valid phone number in the following format XXX-XXX-XXXX.';
      } else {
        ctrl.alertType = 'alert alert-success';
        ctrl.alertVerify = response.data.validation_code;
        return;
      }
    });
  };

  ctrl.closeAlert = function () {
    ctrl.alertCode = false;
    ctrl.alertVerify = false;
  };

  ctrl.close = function () {
    location.reload();
    $uibModalInstance.close();
  };
}
