app.controller('GrowController', GrowController);

function GrowController(prompt, userData, progress) {
  var ctrl = this;
  var maxNum;
  var current;

  userData.getUserId().then(function (response) {
    ctrl.userId = response;
    progress.getProgress(ctrl.userId).then(function (response) {
      var progressData = response[0];
      var data;

      if (response.length === 0) {
        ctrl.max = getRandomNumber(35, 55);
        ctrl.current = 0;
        data = { userId: ctrl.userId, maxNum: ctrl.max, current: ctrl.current };
        progress.postProgress(data);

      } else if (progressData.max === progressData.current) {
        ctrl.max = getRandomNumber(35, 55);
        ctrl.current = 0;
        data = { userId: ctrl.userId, maxNum: ctrl.max, current: ctrl.current };
        progress.editProgress(data);

      } else {
        ctrl.max = progressData.max;
        ctrl.current = progressData.current;
      }
    });
  });

  ctrl.gatherNutrients = function (idNum) {
    prompt.getResponses(idNum).then(function (response) {
      if (response.length >= 2) {
        var firstNum = getRandomNumber(0, response.length);
        var secondNum = getRandomNumber(0, response.length);

        while (firstNum === secondNum) {
          secondNum = getRandomNumber(0, response.length);
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
        ctrl.water = 'waterchangenow'; //change effect here
      });

    } else if (ctrl.item === 'sun') {
      idToChange = ctrl.sunId;
      prompt.changeResStatus(idToChange).then(function (response) {
        ctrl.sun = 'sunchangednow'; //change effect here
      });
    }
  };

  console.log('GrowController loaded');

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
