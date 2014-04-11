define(['./module'], function(services) {
  'use strict';
  services.factory('printReportServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function() {
          return $http.post('/GetReportList', {
            bodySign: basicInfo.bodySign
          });
        }
      };
    }
  ]);
});
