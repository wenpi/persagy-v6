define(['./module'], function(services) {
  'use strict';
  services.factory('fourParameterTextServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function() {
          return $http.post('/GetLastMonthIndicatorview', {
            bodySign: basicInfo.bodySign
          });
        }
      };
    }
  ]);
});
