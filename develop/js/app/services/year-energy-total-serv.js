define(['./module'], function(services) {
  'use strict';
  services.factory('yearEnergyTotalServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getData: function() {
          var year = new Date().getFullYear();
          return $http.post('/GetBuildingEnergy', {
            bodySign: basicInfo.bodySign,
            year: year
          });
        }
      };
    }
  ]);
});
