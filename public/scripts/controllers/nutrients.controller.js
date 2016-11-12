app.controller('NutrientController', NutrientController);

function NutrientController(userData, prompt) {
  var ctrl = this;
  ctrl.promptResponses = [];

  ctrl.submitDateRange = function (first, second) {
    userData.getUserId().then(function (response) {
      var userId = response;
      var startDate = first;
      var endDate = second;
      prompt.getResponseRange(userId, startDate, endDate).then(function (response) {
        ctrl.promptResponses = response.data;
        console.log(ctrl.promptResponses);
      });
    });
  };
};
