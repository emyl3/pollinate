app.controller('GrowController', GrowController);

function GrowController(prompt, userData, progress, flower, $uibModal) {
  var ctrl = this;
  var maxNum;
  var current;

  userData.getUserId().then(function (response) {
    var data;
    ctrl.userId = response;
    progress.getProgress(ctrl.userId).then(function (response) {
      var progressData = response[0];

      if (response.length === 0) {
        ctrl.max = getRandomNumber(25, 35);
        ctrl.current = 0;
        data = { userId: ctrl.userId, maxNum: ctrl.max, current: ctrl.current };
        progress.postProgress(data);

      } else if (progressData.max === progressData.current) {
        ctrl.max = getRandomNumber(25, 35);
        ctrl.current = 0;
        data = { userId: ctrl.userId, maxNum: ctrl.max, current: ctrl.current };
        progress.editProgress(data);

      } else {
        ctrl.max = progressData.max;
        ctrl.current = progressData.current;
      }

      setFlowerImage(ctrl.current, ctrl.max);
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
  };

  ctrl.setSun = function () {
    ctrl.item = 'sun';
  };

  ctrl.feedPlant = function () {
    var idToChange;
    if (ctrl.item === 'water') {
      idToChange = ctrl.waterId;
      prompt.changeResStatus(idToChange).then(function (response) {
        ctrl.water = 'waterchangenow'; //change effect here
        check();
      });
    } else if (ctrl.item === 'sun') {
      idToChange = ctrl.sunId;
      prompt.changeResStatus(idToChange).then(function (response) {
        ctrl.sun = 'sunchangednow'; //change effect here
        check();
      });
    }
  };

  function check() {
    ctrl.current++;
    if (ctrl.current < ctrl.max) {
      //status dialog here
      data = { userId: ctrl.userId, maxNum: ctrl.max, current: ctrl.current };
      progress.editProgress(data).then(function (response) {
        progress.getProgress(ctrl.userId);
      });
    } else if (ctrl.current === ctrl.max) {
      flower.getFlowerNumber()
        .then(function (response) {
        var flowerIdMax =  response + 1;
        ctrl.flowerId = getRandomNumber(1, flowerIdMax);

        flower.getReward(ctrl.flowerId)
          .then(function (response) {
            var data = { flowerId: ctrl.flowerId, userId: ctrl.userId };
            flower.postFlower(data).then(function (response) {
              ctrl.openModal();
            });
          });
      });

      ctrl.max = getRandomNumber(25, 35);
      ctrl.current = 0;
      data = { userId: ctrl.userId, maxNum: ctrl.max, current: ctrl.current };
      progress.editProgress(data).then(function (response) {
        progress.getProgress(ctrl.userId);
      });
    }
    setFlowerImage(ctrl.current, ctrl.max);

  }

  function setFlowerImage(current, max) {
    var percentComplete = (current / max);
    if (percentComplete <= 0.1) {
      ctrl.plantImage = 'assets/grow/seed0.svg';
      return;
    } else if (percentComplete <= 0.2) {
      ctrl.plantImage = 'assets/grow/seed1.svg';
      return;
    } else if (percentComplete <= 0.4) {
      ctrl.plantImage = 'assets/grow/seed2.svg';
      return;
    } else if (percentComplete <= 0.6) {
      ctrl.plantImage = 'assets/grow/seed3.svg';
      return;
    } else if (percentComplete <= 0.8) {
      ctrl.plantImage = 'assets/grow/seed4.svg';
      return;
    } else if (percentComplete === 1) {
      ctrl.plantImage = 'assets/grow/seed2.svg';
    }
  }

  ctrl.openModal = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/partials/rewardModal.html',
      controller: 'RewardModalController as rCtrl',
      resolve: {
        flowerId: function () {
          return ctrl.flowerId;
        },
      },
    });
  };

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
