app.service('progress', ProgressService);

function ProgressService($http) {

  function postProgress(data) {
    return $http.post('/progress', data)
    .then(function (response) {
      return response;
    });
  }

  function getProgress(userId) {
    return $http.get('/progress', {
      params: {
        userId: userId,
      },
    }).then(function (response) {
      return response.data;
    });
  }

  function editProgress(data) {
    return $http.put('/progress', data)
    .then(function (response) {
      return response;
    });
  }

  return {
    getProgress: getProgress,
    postProgress: postProgress,
    editProgress: editProgress,
  };
}
