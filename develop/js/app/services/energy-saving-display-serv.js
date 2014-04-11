define(['./module'], function(services) {
  'use strict';
  services.factory('energySavingDisplayServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function() {
          return $http.post('/GetEnergySaving', basicInfo.bodySign);
        }
      };
    }
  ]);
});
