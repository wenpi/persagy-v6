define(['./module'], function(services) {
  'use strict';
  services.factory('energyCalendarServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getMonthState: function(date) {
          return $http.post('/GetEnergyCalendar', {
            bodySign: basicInfo.bodySign,
            time: Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', date)
          });
        },
        getDayInfo: function(date) {
          return $http.post('/GetWorkEnergy', {
            bodySign: basicInfo.bodySign,
            time: Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', date)
          });
        }
      };
    }
  ]);
});
