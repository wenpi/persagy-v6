define(['./module'], function(directives) {
  'use strict';
  directives.directive('widgetEnergySavingCount', function() {
    return {
      templateUrl: 'partials/widgets/energy-saving-count.html',
      scope: true,
      controller: function($scope, $element, energySavingCountServ, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        energySavingCountServ.getData().success(function(data) {
          $scope.unit = data.unit;
          $scope.count = data.savingPower;
          $scope.beginDate = data.beginTime;
          $scope.percent = data.savingProbe;
        });
      }
    };
  });
});
