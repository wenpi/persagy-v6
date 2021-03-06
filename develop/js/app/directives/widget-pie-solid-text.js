define(['./module', 'sagyChart'], function(directives, sagyChart) {
  'use strict';
  directives.directive('widgetPieSolidText', function() {
    return {
      templateUrl: 'partials/widgets/pie-solid-text.html',
      scope: true,
      controller: function($scope, $element, pieSolidTextServ, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        var chart = null;
        var initChart = function(data) {
          var i = 0,
            arr = [];
          for (i = 0; i < data.length; i++) {
            arr.push(data[i].energyProbe);
          }
          chart = sagyChart({
            chartOption: {
              colors: config.colors,
              chart: {
                plotBackgroundColor: "rgba(0,0,0,0)",
                backgroundColor: "rgba(0,0,0,0)",
                animation: true,
                plotBorderWidth: null,
                plotShadow: false,
                margin: [20, 20, 20, 20],
                width: 180,
                height: 180
              },
              title: {
                text: null
              },
              tooltip: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              plotOptions: {
                series: {
                  animation: false
                },
                pie: {
                  borderWidth: 0,
                  enableMouseTracking: false,
                  allowPointSelect: false,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: false
                  },
                  size: 180
                }
              },
              series: [{
                type: 'pie',
                data: arr
              }]
            },
            renderTo: $element.find('.pie_chart')[0],
            autoAxis: false,
            autoTooltip: false,
            subline: {
              enabled: false
            },
            convertUnit: {
              enabled: false
            },
            ajaxOption: {
              index: 0,
              callback: null,
              pointHandler: null,
              isJson: true
            }
          });
        };
        $scope.items = null;
        $scope.colors = config.colors;
        pieSolidTextServ.getData(config).success(function(data) {
          initChart(data);
          $scope.items = data;
        });
      }
    };
  });
});
