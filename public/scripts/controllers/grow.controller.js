app.controller('GrowController', GrowController);

function GrowController(prompt, userData) {
  var ctrl = this;

  userData.getUserId().then(function (response) {
    ctrl.userId = response;
  });

  ctrl.gatherNutrients = function (idNum) {
    prompt.getResponses(idNum).then(function (response) {
      console.log(response);
    });
  };

  console.log('GrowController loaded');


}
function getRandomNumber(num) {
  var promptNumber = Math.floor((Math.random() * num) + 0);
  return promptNumber;
}
