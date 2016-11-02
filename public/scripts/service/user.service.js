app.service('userData', UserInfoService);

function UserInfoService($http) {
  function getUserInfo() {
    return $http.get('/userInfo')
      .then(function (response) {
      return response;
    });
  }

  function getUserId() {
    return $http.get('/userInfo')
      .then(function (response) {
      return response.data.id;
    });
  }

  return {
    getUserInfo: getUserInfo,
    getUserId: getUserId,
  };
}
