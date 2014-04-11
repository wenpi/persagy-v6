define(['./module'], function(services) {
  'use strict';
  services.factory('pieSolidTextServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function(config) {
          return $http.post('/GetEnergyItem', {
            bodySign: basicInfo.bodySign,
            type: config.data_type
          });
        }
      };
    }
  ]);
});
