define(['./module'], function(directives) {
  'use strict';
  directives.directive('widgetPrintReport', function() {
    return {
      templateUrl: 'partials/widgets/print-report.html',
      scope: true,
      controller: function($scope, $element, printReportServ, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        $scope.body_sign = basicInfoServ.bodySign;
        printReportServ.getData().success(function(data) {
          $scope.reports = data;
        });
      }
    };
  });
});
