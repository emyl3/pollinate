app.controller('GrowController', GrowController);

function GrowController(prompt, userData) {
  var ctrl = this;

  userData.getUserId().then(function (response) {
    ctrl.userId = response;
  });

  ctrl.gatherNutrients = function (idNum) {
    prompt.getResponses(idNum).then(function (response) {
      var firstNum = getRandomNumber(response.length);
      var secondNum = getRandomNumber(response.length);

      while (firstNum === secondNum) {
        secondNum = getRandomNumber(response.length);
      }

      ctrl.water = response.data[firstNum].response;
      ctrl.waterId = response.data[firstNum].id;
      ctrl.sun = response.data[secondNum].response;
      ctrl.sunId = response.data[secondNum].id;
    });
  };

  ctrl.setWater = function () {
    ctrl.item = 'water';
    console.log(ctrl.item);
  };

  ctrl.setSun = function () {
    ctrl.item = 'sun';
    console.log(ctrl.item);
  };

  ctrl.feedPlant = function () {
    var idToChange;
    if (ctrl.item === 'water') {
      idToChange = ctrl.waterId;
      prompt.changeResStatus(idToChange).then(function(response){
      console.log('changed id');
      ctrl.water = 'waterchangenow';
      });

    } else if (ctrl.item === 'sun') {
      idToChange = ctrl.sunId;
      prompt.changeResStatus(idToChange).then(function(response){
      console.log('changed id');
      ctrl.sun = 'sunchangednow';
    });
    }
  };

  console.log('GrowController loaded');

  function getRandomNumber(num) {
    var promptNumber = Math.floor((Math.random() * num) + 0);
    return promptNumber;
  }

}
