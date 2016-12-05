app.controller('SendFlowerModalController', SendFlowerModalController);

function SendFlowerModalController($uibModalInstance, flower, flowerId, flowerUrl, userData, $http) {
  var ctrl = this;
  ctrl.flowerId = flowerId;
  ctrl.flowerUrl = flowerUrl;
  ctrl.isCollapsed = false;
  ctrl.panelStatus = 'panel-warning';
  ctrl.formAlert = 'Phone Number to Receive Affirmation';
  ctrl.panelMessage = 'Phone Number to Verify';

  ctrl.open = function () {
    ctrl.isCollapsed = !ctrl.isCollapsed;
  };

  flower.getReward(flowerId).then(function (response) {
    ctrl.url = response[0].url;
  });

  userData.getUserId().then(function (response) {
    ctrl.userId = response;
  });

  ctrl.submitForm = function (phone, message, userId, flowerId) {
    if (phone === undefined) {
      ctrl.formAlertType = 'alert alert-danger';
      ctrl.formAlert = 'Please enter a verified, valid phone number.';
      return;
    } else {
      var data = { phone: phone, message: message, flowerUrl: flowerUrl };
      $http.post('/twilioroute', data).then(function (response) {
        if (response.data.status === 400) {
          ctrl.isCollapsed = !ctrl.isCollapsed;
          ctrl.panelStatus = 'panel-danger';
          ctrl.panelMessage = 'This phone number is not verified. Please verify the number.';
        } else {
          flower.deleteUsedFlower(userId, flowerId).then(function (response) {
            location.reload();
            ctrl.closeModal();
          });
        }
      });
    }
  };

  ctrl.submitRegistration = function (phone) {
    var data = { phone: '+1' + phone };
    $http.post('/twilioroute/signup', data).then(function (response) {
      if (response.data.code === 21450) {
        ctrl.alertType = 'alert alert-info';
        ctrl.alertCode = 'This phone number is already verified and ready to ' +
                        'receive affirmations.';
        return;
      } else if (response.data.code === 400) {
        ctrl.alertType = 'alert alert-danger';
        ctrl.alertCode = 'Please enter a valid phone number in the following' +
                        'format XXX-XXX-XXXX.';
        return;
      } else {
        ctrl.alertType = 'alert alert-success';
        ctrl.alertCode = 'Please enter the following verification code: ' +
                         response.data.validation_code + ' when prompted by a' +
                         ' phone call from 415-723-4000.';
        return;
      }
    });
  };

  ctrl.closeAlertCode = function () {
    ctrl.alertCode = false;
  };

  ctrl.closeFormAlert = function () {
    ctrl.formAlert = false;
  };

  ctrl.closeModal = function () {
    $uibModalInstance.close();
  };
}
