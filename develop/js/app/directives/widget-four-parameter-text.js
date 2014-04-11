define(['./module', 'sagyChart'], function(directives, sagyChart) {
  'use strict';
  directives.directive('widgetFourParameterText', function() {
    return {
      templateUrl: 'partials/widgets/four-parameter-text.html',
      scope: true,
      controller: function($scope, $element, basicInfoServ, fourParameterTextServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        $scope.bodySign = basicInfoServ.bodySign;
        fourParameterTextServ.getData().success(function(data) {
          var i = 0;
          for (i = 0; i < data.length; i++) {
            data[i].data = sagyChart.numFormat(data[i].data);
          }
          $scope.paras = data;
        });
      }
    };
  });
});
