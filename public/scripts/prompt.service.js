app.service('prompt', PromptService);

function PromptService($http) {
  this.getPromptArray = function () {
    return $http.get('/prompts')
    .then(function (response) {
      return response.data;
    });
  };
}
