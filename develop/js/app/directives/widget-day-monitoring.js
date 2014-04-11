define(['./module', 'highcharts', 'sagyChart'], function(directives, highcharts, sagyChart) {
  'use strict';
  directives.directive('widgetDayMonitoring', function() {
    return {
      templateUrl: 'partials/widgets/day-monitoring.html',
      scope: true,
      controller: function($scope, $element, dayMonitoringServ, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        var chart = sagyChart({
          chartOption: {
            chart: {
              backgroundColor: "rgba(255,0,0,0)",
              type: 'line',
              // spacingBottom: 20,
              marginRight: 50,
              marginLeft: 50,
              // spacingLeft: 0,
              // renderTo: "chart_container",
              height: 220,
              // width: 750,
              marginBottom: 50,
              plotBorderWidth: 0,
              //plotBackgroundColor: "#fffff9"
            },
            legend: {
              enabled: false
            },
            credits: {
              enabled: false,
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

                pointPadding: -0.2,
                borderWidth: 0,
                groupPadding: 0.2,
                // pointPlacement: "on",
                shadow: false
              }
            },
            tooltip: {
              enabled: true,
              animation: false,
              backgroundColor: null,
              borderWidth: 0,
              shadow: false,
              formatter: function() {
                return '<span>' + this.y + '</span><br/><span>' + highcharts.dateFormat('%H:%M', this.x) + '</span>';
              },
              useHTML: true
            },
            title: {
              text: null
            },
            xAxis: {
              type: "datetime",
              showFirstLabel: false,
              endOnTick: true,
              tickLength: 0,
              tickWidth: 0,
              gridLineColor: "#eaeaea",
              gridLineDashStyle: "longDash",
              gridLineWidth: 1,
              lineColor: '#cacaca',
              lineWidth: 1,
              minPadding: 0,
              maxPadding: 0,
              title: {
                text: null
              },
              labels: {
                enabled: true,
                style: {
                  fontSize: 12,
                  fontFamily: "Arial",
                  color: "#959595"
                }
              }
            },
            yAxis: {
              tickWidth: 0,
              gridLineColor: "#eaeaea",
              gridLineDashStyle: "longDash",
              minPadding: 0,
              title: {
                text: null
              },
              lineWidth: 0,
              labels: {
                align: "right",
                enabled: true,
                y: 10,
                style: {
                  fontSize: 12,
                  fontFamily: "Arial",
                  color: "#959595"
                }
              }
            },
            series: [{
              color: "#42918d",
              data: [],
              zIndex: 9,
              marker: {
                enabled: true,
                radius: 3,
                fillColor: 'white',
                lineColor: '#42918d',
                lineWidth: 3,
                symbol: 'circle'
              },
            }, {
              color: "#dedede",
              data: [],
              zIndex: 8
            }]
          },
          renderTo: $element.find('.sagy_chart')[0],
          autoAxis: true,
          autoTooltip: false,
          subline: {
            enabled: false
          },
          convertUnit: {
            enabled: false
          },
          ajaxOption: {
            url: "",
            transferData: {},
            index: 0,
            callback: null,
            pointHandler: null,
            isJson: true
          }
        });
        dayMonitoringServ.getData().success(function(data) {
          var unitObj = sagyChart.convertUnit(data.currPower, data.unit);
          $scope.curPower = unitObj.data;
          $scope.curPowerUnit = unitObj.unit;
          unitObj = sagyChart.convertUnit(data.maxPower, data.unit);
          $scope.maxPower = unitObj.data;
          $scope.maxPowerUnit = unitObj.unit;
          $scope.unit = data.unit;
          $scope.maxPowerTime = data.maxPowerTime;
          chart.setData(data.data);
        });
      }
    };
  });
});
