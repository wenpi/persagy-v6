define(['./module'], function(services) {
  'use strict';
  services.factory('amplificationTop3Serv', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function(config) {
          return $http.post('/GetPowerAmplit', {
            bodySign: basicInfo.bodySign,
            type: config.up_down,
            expression: config.formula,
            timeTypeId: config.time_type
          });
        }
      };
    }
  ]);
});
