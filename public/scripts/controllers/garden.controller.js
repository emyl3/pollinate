app.controller('GardenController', GardenController);

function GardenController(userData, flower) {
  var ctrl = this;

  userData.getUserId().then(function (response) {
    flower.getUserFlowers(response).then(function (response) {
      console.log(response);

      ctrl.flowers = response;
    });
  });
}
