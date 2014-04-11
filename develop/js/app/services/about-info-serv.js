define(['./module'], function(services) {
  'use strict';
  services.factory('aboutInfoServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      var runInfoRequest = function() {
        var data = {
          userId: basicInfo.userId,
          bodySign: basicInfo.bodySign
        };
        return $http.post('/GetCompanyDescription', data);
      };

      return {
        getText: function() {
          return runInfoRequest();
        }
      };
    }
  ]);
});
