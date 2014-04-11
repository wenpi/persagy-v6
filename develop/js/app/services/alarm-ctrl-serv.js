define(['./module'], function(services) {
  'use strict';
  services.factory('alarmCtrlServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getAlarm: function() {
          return $http.post('/GetAlarm', {
            userId: basicInfo.userId,
            bodySign: basicInfo.bodySign
          });
        }
      };
    }
  ]);
});
