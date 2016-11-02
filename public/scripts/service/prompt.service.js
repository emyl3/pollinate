app.service('prompt', PromptService);

function PromptService($http) {
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

  function getResponses(userId) {
    return $http.get('/prompts/userResponse', {
      params: {
        userId: userId,
      },
    }).then(function (response) {
      return {
        data: response.data,
        length: response.data.length,
      };
    });
  }

  return {
    getPromptArray: getPromptArray,
    postResponse: postResponse,
    getResponses: getResponses,
  };
}
