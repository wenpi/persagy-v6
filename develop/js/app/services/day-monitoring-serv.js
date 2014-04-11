define(['./module'], function(services) {
  'use strict';
  services.factory('dayMonitoringServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function() {
          return $http.post('/GetRealMonitor', {
            bodySign: basicInfo.bodySign
          });
        }
      };
    }
  ]);
});
