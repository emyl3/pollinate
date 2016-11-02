app.service('prompt', PromptService);

function PromptService($http) {
  function getUserInfo() {
    return $http.get('/userInfo')
      .then(function (response) {
      return response;
    });
  }

  function getPromptArray() {
    return $http.get('/prompts')
    .then(function (response) {
      return response.data;
    });
  }

  function postResponse(data) {
    return $http.post('/prompts', data)
    .then(function (response) {
      return response;
    });
  }

  return {
    getUserInfo: getUserInfo,
    getPromptArray: getPromptArray,
    postResponse: postResponse,
  };
}
