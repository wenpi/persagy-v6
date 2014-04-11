define(['./module'], function(services) {
  'use strict';
  services.factory('energySavingCountServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function() {
          return $http.post('/GetEnergySaving', {
            bodySign: basicInfo.bodySign
          });
        }
      };
    }
  ]);
});
