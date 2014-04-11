define(['./module'], function(services) {
  'use strict';
  services.factory('energyTrendServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getTypeList: function() {
          return $http.post('/GetEnergyTimeType', {
            bodySign: basicInfo.bodySign
          });
        },
        getEnergyData: function(isEnergy, energyType, timeType) {
          return $http.post('/GetEnergyTrend', {
            isEnergy: isEnergy,
            energyType: energyType,
            timeType: timeType,
            bodySign: basicInfo.bodySign
          });
        }
      };
    }
  ]);
});
