app.controller('GrowController', GrowController);

function GrowController(prompt, userData) {
  var ctrl = this;

  userData.getUserId().then(function (response) {
    ctrl.userId = response;
  });

  ctrl.gatherNutrients = function (idNum) {
    prompt.getResponses(idNum).then(function (response) {
      if (response.length >= 2) {
        var firstNum = getRandomNumber(response.length, 0);
        var secondNum = getRandomNumber(response.length, 0);

        while (firstNum === secondNum) {
          secondNum = getRandomNumber(response.length, 0);
        }

        ctrl.water = response.data[firstNum].response;
        ctrl.waterId = response.data[firstNum].id;
        ctrl.sun = response.data[secondNum].response;
        ctrl.sunId = response.data[secondNum].id;
      } else {
        //need to create alert that redirects to plant page
        console.log('you need more nutrients.');
      }
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
      prompt.changeResStatus(idToChange).then(function (response) {
        ctrl.water = 'waterchangenow';
      });

    } else if (ctrl.item === 'sun') {
      idToChange = ctrl.sunId;
      prompt.changeResStatus(idToChange).then(function (response) {
        ctrl.sun = 'sunchangednow';
      });
    }
  };

  console.log('GrowController loaded');

  function getRandomNumber(max, min) {
    var promptNumber = Math.floor((Math.random() * max) + min);
    return promptNumber;
  }

}
