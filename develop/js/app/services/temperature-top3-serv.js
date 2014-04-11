define(['./module'], function(services) {
  'use strict';
  services.factory('temperatureTop3Serv', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function(config) {
          return $http.post('/GetVerticalBarview', {
            bodySign: basicInfo.bodySign,
            type: config.data_type
          });
        }
      };
    }
  ]);
});
