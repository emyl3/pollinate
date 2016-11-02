app.controller('PlantController', PlantController);

function PlantController(prompt) {
  var ctrl = this;

  ctrl.getPrompt = function (num) {
    num = getRandomNumber();

    prompt.getPromptArray()
      .then(function (response) {
        ctrl.prompt = response[num].statement;
      });
  };

  ctrl.getPrompt();
}

function getRandomNumber() {
  var promptNumber = Math.floor((Math.random() * 5) + 0);
  return promptNumber;
}
