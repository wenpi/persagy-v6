define(['./module'], function(directives) {
  'use strict';
  directives.directive('widgetAboutInfo', function() {
    return {
      templateUrl: 'partials/widgets/about-info.html',
      scope: true,
      controller: function($scope, $element, aboutInfoServ, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        $scope.bodySign = basicInfoServ.bodySign;
        $scope.text = null;
        aboutInfoServ.getText().success(function(data) {
          $scope.text = data.describe;
        });
      }
    };
  });
});
