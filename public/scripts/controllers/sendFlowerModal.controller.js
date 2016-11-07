app.controller('SendFlowerModalController', SendFlowerModalController);

function SendFlowerModalController($uibModalInstance, flower, flowerId, $http) {
  var ctrl = this;
  ctrl.flowerId = flowerId;
  flower.getReward(flowerId).then(function (response) {
    console.log('response', response);
    ctrl.url = response[0].url;
    console.log(ctrl.url);
  })

  ctrl.submitForm = function (phone, message) {
    var data = {phone: phone, message: message};
    console.log('flower id', ctrl.flowerId);
    $http.post('/twilioroute', data)
        ctrl.close();
    
    console.log(phone);
    console.log(message);
  };
  // flower.getReward(flowerId).then(function (response) {
  //   ctrl.url = response[0].url;
  // });

  ctrl.close = function () {
    $uibModalInstance.close();
  };
}
