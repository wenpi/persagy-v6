define(['./module'], function(controllers) {
  'use strict';
  controllers.controller('alarmCtrl', ['$scope', 'alarmCtrlServ', 'basicInfoServ',
    function($scope, alarmCtrlServ, basicInfoServ) {
      alarmCtrlServ.getAlarm().success(function(data) {
        $scope.alarms = data.alarms;
        $scope.count = data.count;
      });
    }
  ]);
});
