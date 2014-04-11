define(['./module'], function(directives) {
  'use strict';
  directives.directive('widgetEnergySavingDisplay', function() {
    return {
      templateUrl: 'partials/widgets/energy-saving-display.html',
      scope: true,
      controller: function($scope, $element, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
      }
    };
  });
});
