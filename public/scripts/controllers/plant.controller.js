app.controller('PlantController', PlantController);

function PlantController(prompt, userData) {
  var ctrl = this;

  userData.getUserInfo().then(function (response) {
      ctrl.userId = response.data.id;
    });

  ctrl.getPrompt = function () {
    num = getRandomNumber();

    prompt.getPromptArray()
      .then(function (response) {
        ctrl.prompt = response[num].statement;
        ctrl.promptId = response[num].id;
      });
  };

  ctrl.submit = function (user, id, response) {
    var value = {
      user: user,
      id: id,
      response: response,
    };

    prompt.postResponse(value)
      .then(function (response) {
        ctrl.response = '';
        ctrl.getPrompt();
      });
  };

  ctrl.getPrompt();
}

function getRandomNumber() {
  var promptNumber = Math.floor((Math.random() * 5) + 0);
  return promptNumber;
}
