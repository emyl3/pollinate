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

  function changeResStatus(id) {
    var data = { id: id };
    return $http.put('/prompts/userResponse', data)
    .then(function (response) {
      return response;
    });
  }

  function getResponseRange(userId, startDate, endDate) {
    return $http.get('/prompts/userResponseRange', {
      params: {
        userId: userId,
        startDate: startDate,
        endDate: endDate,
      },
    }).then(function (response) {
      return response;
    });
  }

  return {
    getPromptArray: getPromptArray,
    postResponse: postResponse,
    getResponses: getResponses,
    changeResStatus: changeResStatus,
    getResponseRange: getResponseRange,
  };
}
