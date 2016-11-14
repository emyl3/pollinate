app.controller('GatherController', GatherController);

function GatherController(prompt, userData) {
  var ctrl = this;
  ctrl.isCollapsed = false;

  userData.getUserInfo().then(function (response) {
      ctrl.userId = response.data.id;
    });

  ctrl.getPrompt = function () {

    prompt.getPromptArray()
      .then(function (response) {
        var num = getRandomNumber();
        ctrl.prompt = response[num].statement;
        ctrl.promptId = response[num].id;
      });
  };

  ctrl.submit = function (user, id, response, statement) {
    var entryDate = new Date();
    var dd = entryDate.getDate();
    var mm = entryDate.getMonth() + 1;
    var yyyy = entryDate.getFullYear();
    var date = mm + '/' + dd + '/' + yyyy;
    var entrydate = yyyy + '-' + mm + '-' + dd;

    var value = {
      user: user,
      id: id,
      entrydate: entrydate,
      response: 'On ' + date + ', I ' + statement + ' ' + response,
    };

    prompt.postResponse(value)
      .then(function (response) {
        ctrl.alertType = 'alert alert-success';
        ctrl.alertCode = 'Success! Nutrient added!';
        ctrl.response = '';
        ctrl.getPrompt();
      });
  };

  ctrl.getPrompt();

  ctrl.closeAlertCode = function () {
    ctrl.alertCode = false;
  };

  function getRandomNumber() {
    var promptNumber = Math.floor((Math.random() * 5) + 0);
    return promptNumber;
  }
}
