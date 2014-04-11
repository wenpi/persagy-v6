define(['./module'], function(services) {
  'use strict';
  services.factory('loadTop3Serv', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function(config) {
          return $http.post('/GetTransformer', {
            bodySign: basicInfo.bodySign,
            type: config.data_type
          });
        }
      };
    }
  ]);
});
