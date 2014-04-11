define(['./module', 'sagyChart'], function(directives, sagyChart) {
  'use strict';
  directives.directive('widgetAmplificationTop3', function() {
    return {
      templateUrl: 'partials/widgets/amplification-top3.html',
      scope: true,
      controller: function($scope, $element, amplificationTop3Serv, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        var color = config.color;
        var strokeColor = '#eee';
        var drawCircle = function(three) {
          var values = [],
            i = 0;
          for (i = 0; i < three.length; i++) {
            values.push(parseInt(three[i].percent) / 100);
          }
          var ctx = $element.find('canvas')[0].getContext("2d");
          ctx.beginPath();
          ctx.arc(75, 75, 65, 0, Math.PI * 2, false);
          ctx.lineWidth = 5;
          ctx.strokeStyle = strokeColor;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(75, 75, 65, -Math.PI * 0.5, Math.PI * 2 * values[0] - Math.PI * 0.5, false); //Ç°ºó¼õÈ¥Math.PI * 0.5
          ctx.lineWidth = 5;
          ctx.strokeStyle = color;
          ctx.stroke();

          var ctx_2 = $element.find('canvas')[1].getContext("2d");
          ctx_2.beginPath();
          ctx_2.arc(75, 75, 65, 0, Math.PI * 2, false);
          ctx_2.lineWidth = 5;
          ctx_2.strokeStyle = strokeColor;
          ctx_2.stroke();

          ctx_2.beginPath();
          ctx_2.arc(75, 75, 65, -Math.PI * 0.5, Math.PI * 2 * values[1] - Math.PI * 0.5, false); //Ç°ºó¼õÈ¥Math.PI * 0.5
          ctx_2.lineWidth = 5;
          ctx_2.strokeStyle = color;
          ctx_2.stroke();

          var ctx_3 = $element.find('canvas')[2].getContext("2d");
          ctx_3.beginPath();
          ctx_3.arc(75, 75, 65, 0, Math.PI * 2, false);
          ctx_3.lineWidth = 5;
          ctx_3.strokeStyle = strokeColor;
          ctx_3.stroke();

          ctx_3.beginPath();
          ctx_3.arc(75, 75, 65, -Math.PI * 0.5, Math.PI * 2 * values[2] - Math.PI * 0.5, false); //Ç°ºó¼õÈ¥Math.PI * 0.5
          ctx_3.lineWidth = 5;
          ctx_3.strokeStyle = color;
          ctx_3.stroke();
        };
        $scope.color = color;
        $scope.type = config.up_down;
        $scope.three = null;
        amplificationTop3Serv.getData(config).success(function(data) {
          var i = 0,
            unitObj;
          for (i = 0; i < data.length; i++) {
            unitObj = sagyChart.convertUnit(data[i].count, config.unit);
            data[i].count = unitObj.data;
            data[i].unit = unitObj.unit;
          }
          $scope.three = data;
          drawCircle(data);
        });

      }
    };
  });
});
