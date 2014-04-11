define(['./module'], function(services) {
  'use strict';
  services.factory('pieHollowDataServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function(config) {
          return $http.post('GetEnergyHollowPieview', {
            bodySign: basicInfo.bodySign,
            type:config.data_type
          });
        }
      };
    }
  ]);
});
