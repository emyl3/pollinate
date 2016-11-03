app.service('flower', FlowerService);

function FlowerService($http) {
  //
  // function postProgress(data) {
  //   return $http.post('/progress', data)
  //   .then(function (response) {
  //     return response;
  //   });
  // }

  function getFlowerNumber() {
    return $http.get('/flowers')
      .then(function (response) {
        return response.data.length;
      });
  }

  // function editProgress(data) {
  //   return $http.put('/progress', data)
  //   .then(function (response) {
  //     return response;
  //   });
  // }

  return {
    getFlowerNumber: getFlowerNumber,
  };
}
