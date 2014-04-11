define(['./module', 'sagyChart', 'highcharts'], function(directives, sagyChart, highcharts) {
  'use strict';
  directives.directive('widgetYearEnergyTotal', function() {
    return {
      templateUrl: 'partials/widgets/year-energy-total.html',
      scope: true,
      controller: function($scope, $element, yearEnergyTotalServ, basicInfoServ) {
        var year = new Date().getFullYear();
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title.replace('$year$', year);
        $scope.subtitle = config.subtitle;
        var chart = sagyChart({
          chartOption: {
            chart: {
              plotBackgroundColor: "rgba(0,0,0,0)",
              backgroundColor: "rgba(0,0,0,0)",
              animation: true,
              plotBorderWidth: null,
              plotShadow: false,
              margin: [20, 13.5, 20, 70.5],
              //width: 1200,
              height: 300
            },
            yAxis: {
              labels: {
                style: {
                  color: '#959595'
                }
              },
              gridLineColor: '#eaeaea'
            },
            xAxis: {
              // tickInterval: 1,
              type: 'datetime',
              labels: {
                x: 60,
                style: {
                  color: '#959595',
                },
                formatter: function() {
                  return highcharts.dateFormat('%m', this.value);
                }
              }
            },
            title: {
              text: null
            },
            tooltip: {
              enabled: true,
              animation: false,
              backgroundColor: null,
              borderWidth: 0,
              shadow: false,
              formatter: function() {
                return '<span>' + this.y + '</span><br/><span>' + highcharts.dateFormat('%m.%d', this.x) + '</span>';
              },
              useHTML: true
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              series: {
                turboThreshold: 200000,
                stickyTracking: false,
                states: {
                  hover: {
                    enabled: false
                  }
                },
                pointPadding: 0,
                borderWidth: 0,
                groupPadding: 1,
                shadow: false
              },
              column: {
                grouping: false,
                borderWidth: 0,
                pointWidth: 2,
                allowPointSelect: false,
              }
            },
            series: [{
              type: 'column',
              data: [],
              color: config.current_color,
              zIndex: 2,
              // pointWidth: 2,

            }, {
              type: 'column',
              data: [],
              color: '#E4E4E4',
              zIndex: 1,
              enableMouseTracking: false,
              // pointWidth: 2,
            }]
          },
          renderTo: $element.find('.sagy_chart')[0],
          autoAxis: false,
          autoTooltip: false,
          subline: {
            enabled: false
          },
          convertUnit: {
            enabled: false
          },
          ajaxOption: {
            transferData: {},
            index: 0,
            callback: null,
            pointHandler: function() {
              if (this.optional) {
                this.color = config.higher_color;
              }
            },
            isJson: true
          }
        });
        yearEnergyTotalServ.getData().success(function(data) {
          var obj = {},
            optionalArr = data.optional,
            i = 0;
          for (i = 0; i < optionalArr.length; i++) {
            obj[optionalArr[i]] = true;
          }
          data.optional = obj;
          $scope.unit = data.unit;
          chart.setData(data);
        });
      }
    };
  });
});
