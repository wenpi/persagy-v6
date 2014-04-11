define(['./module', 'sagyChart'], function(directives, sagyChart) {
  'use strict';
  directives.directive('widgetLoadTop3', function() {
    return {
      templateUrl: 'partials/widgets/load-top3.html',
      scope: true,
      controller: function($scope, $element, loadTop3Serv, basicInfoServ) {
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
        loadTop3Serv.getData(config).success(function(data) {
          var i = 0,
            temp, unitObj,
            arr = [];
          for (i = 0; i < data.length; i++) {
            temp = data[i];
            unitObj = sagyChart.convertUnit(temp.currValue, temp.unit);
            arr.push({
              name: temp.name,
              percent: temp.probe,
              value: unitObj.data,
              unit: unitObj.unit
            });
          }
          $scope.items = arr;
        });
      }
    };
  });
});
