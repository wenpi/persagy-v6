define(['./module'], function(directives) {
  'use strict';
  directives.directive('widgetTemperatureTop3', function() {
    return {
      templateUrl: 'partials/widgets/temperature-top3.html',
      scope: true,
      controller: function($scope, $element, temperatureTop3Serv, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        $scope.items = [{
          percent: 0
        }, {
          percent: 0
        }, {
          percent: 0
        }];
        temperatureTop3Serv.getData(config).success(function(data) {
          console.log(data);
          var i = 0,
            temp,
            arr = [];
          for (i = 0; i < data.length; i++) {
            temp = data[i];
            arr.push({
              name: temp.name,
              percent: temp.currValue / config.limit * 100,
              value: temp.currValue,
              unit: temp.unit
            });
          }
          $scope.items = arr;
        });
      }
    };
  });
});
