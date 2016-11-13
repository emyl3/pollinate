app.controller('NutrientController', NutrientController);

function NutrientController(userData, prompt) {
  var ctrl = this;

  ctrl.submitDateRange = function (first, second) {
    userData.getUserId().then(function (response) {
      var userId = response;
      var startDate = first;
      var endDate = second;
      prompt.getResponseRange(userId, startDate, endDate).then(function (response) {
        if (response.data.length < 1) {
          ctrl.alertType = 'alert alert-danger';
          ctrl.alertCode = 'You have no nutrients from those dates. Please enter a valid date range.';
        } else {
          ctrl.promptResponses = response.data;
        }
      });
    });
  };

  ctrl.closeAlertCode = function () {
    ctrl.alertCode = false;
  };
}
