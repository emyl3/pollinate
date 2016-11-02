app.service('userData', UserInfoService);

function UserInfoService($http) {
  function getUserInfo() {
    return $http.get('/userInfo')
      .then(function (response) {
      return response;
    });
  }

  return {
    getUserInfo: getUserInfo,
  };
}
