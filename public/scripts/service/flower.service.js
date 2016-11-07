app.service('flower', FlowerService);

function FlowerService($http) {

  function postFlower(data) {
    return $http.post('/flowers', data)
    .then(function (response) {
      return response;
    });
  }

  function getFlowerNumber() {
    return $http.get('/flowers')
      .then(function (response) {
        return response.data.length;
      });
  }

  function getReward(flowerId) {
    return $http.get('/flowers/reward', {
      params: {
        flowerId: flowerId,
      },
    }).then(function (response) {
      return response.data;
    });
  }

  function getUserFlowers(userId) {
    return $http.get('/flowers/user', {
      params: {
        userId: userId,
      },
    }).then(function (response) {
      return response.data;
    });
  }

  function deleteUsedFlower(userId, flowerId) {
    return $http.delete('/flowers/user', {
      params: {
        userId: userId,
        flowerId: flowerId,
      },
    }).then(function (response) {
      return response;
    });
  }



  return {
    getFlowerNumber: getFlowerNumber,
    getReward: getReward,
    postFlower: postFlower,
    getUserFlowers: getUserFlowers,
    deleteUsedFlower: deleteUsedFlower,
  };
}
