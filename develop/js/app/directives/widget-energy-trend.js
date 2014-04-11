define(['./module', 'sagyChart', 'highcharts'], function(directives, sagyChart, highcharts) {
  'use strict';
  directives.directive('widgetEnergyTrend', function() {
    return {
      templateUrl: 'partials/widgets/energy-trend.html',
      scope: true,
      controller: function($scope, $element, basicInfoServ, energyTrendServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        var timeTypeText = {
          2: '昨日',
          3: '上周',
          4: '上月',
          5: '去年'
        };
        //todo fuck!
        $scope.selectedTime = 4;
        $scope.selectedType = 1;
        $scope.current_color = config.current_color;
        var chart = sagyChart({
          chartOption: {
            chart: {
              backgroundColor: "rgba(255,255,255,0)",
              type: 'column',
              // spacingBottom: 20,
              marginRight: 40,
              marginLeft: 46,
              // spacingLeft: 0,
              //renderTo: "",
              height: 270,
              marginBottom: 35,
              plotBorderWidth: 0,
              plotBackgroundColor: "#ffffff"
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
                var timeTpye = $scope.selectedTime.timeTypeId;
                if (timeTpye == 2) {
                  return '<span>' + this.y + '</span><br/><span>' + highcharts.dateFormat('%H:%M', this.x) + '</span>';
                }
                if (timeTpye == 3) {
                  return '<span>' + this.y + '</span><br/><span>' + highcharts.dateFormat('%m.%d', this.x) + '</span>';
                }
                if (timeTpye == 4) {
                  return '<span>' + this.y + '</span><br/><span>' + highcharts.dateFormat('%m.%d', this.x) + '</span>';
                }
                if (timeTpye == 5) {
                  return '<span>' + this.y + '</span><br/><span>' + highcharts.dateFormat('%Y.%m', this.x) + '</span>';
                }
                if (timeTpye == 6) {
                  return '<span>' + this.y + '</span><br/><span>' + highcharts.dateFormat('%Y', this.x) + '</span>';
                }
              },
              useHTML: true
            },
            title: {
              text: null
            },
            xAxis: {
              tickLength: 0,
              tickWidth: 0,
              gridLineColor: "#B2EAC7",
              gridLineDashStyle: "longDash",
              gridLineWidth: 0,
              title: {
                text: null
              },
              labels: {
                enabled: true,
                style: {
                  fontSize: 12,
                  fontFamily: "Arial",
                  color: "#aaaaaa"
                }
              },
              offset: 0,
              lineWidth: 1,
              lineColor: "#cacaca",
              categories: null
            },
            yAxis: {
              // startOnTick: true,
              // tickPixelInterval: 80,
              tickWidth: 0,
              // offset: 150,
              gridLineColor: "#dddddd",
              gridLineDashStyle: "longDash",
              gridLineWidth: 1,
              title: {
                text: null
              },
              lineWidth: 0,
              labels: {
                align: "right",
                enabled: true,
                y: 4,
                style: {
                  fontSize: 12,
                  fontFamily: "Arial",
                  color: "#aaaaaa"
                }
              }
            },
            series: [{
              color: config.current_color,
              data: [],
              zIndex: 9
            }, {
              color: "#dedede",
              data: [],
              enableMouseTracking: false,
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
            index: 0,
            isJson: true
          }
        });

        energyTrendServ.getTypeList().then(function(obj) {
          var temp,
            energyTypeArr = obj.data.energyTypeArr,
            timeTypeArr = obj.data.timeTypeArr,
            i = 0;
          for (i = 0; i < timeTypeArr.length; i++) {
            temp = timeTypeArr[i];
            temp.timeText = timeTypeText[temp.timeTypeId];
            if (temp.timeTypeId == 4) {
              $scope.selectedTime = temp;
            }
          }
          $scope.timeTypes = timeTypeArr;

          $scope.energyTypes = energyTypeArr;
          $scope.selectedEnergy = energyTypeArr[0];

          $scope.$watch('selectedType + selectedEnergy.energyTypeName + selectedTime.timeTypeName', function() {
            energyTrendServ.getEnergyData($scope.selectedType,
              $scope.selectedEnergy.energyTypeId,
              $scope.selectedTime.timeTypeId)
              .success(function(data) {
                //todo 换单位
                $scope.baseUnit = data.unit;
                var unitObj = sagyChart.convertUnit(data.currEnergy, data.unit);
                $scope.curEnergy = unitObj.data;
                $scope.curEnergyUnit = unitObj.unit;
                var diff = data.highEnergy,
                  xishu = 1;
                if (diff > 0) {
                  $scope.upOrDownT = '增加';
                  $scope.upOrDownC = 'compLeftArrowUp';

                } else if (diff < 0) {
                  $scope.upOrDownT = '减少';
                  $scope.upOrDownC = 'compLeftArrowDown';
                  xishu = -1;
                } else if (diff === 0) {
                  $scope.upOrDownT = '持平';
                  $scope.upOrDownC = 'compLeftArrowEqual';
                }
                unitObj = sagyChart.convertUnit(xishu * diff, data.unit);
                $scope.highEnergy = unitObj.data;
                $scope.highEnergyUnit = unitObj.unit;
                $scope.highProbe = data.highProbe;
                chart.setData(data.data);
              });
          });
        });

        $scope.costOrEnergy = function(selectedType) {
          var $temp = $element.find(".trendTitleSign");
          if (selectedType === $scope.selectedType) {
            return;
          }
          if (selectedType === 1) {
            $temp.find("span").css("left", "0");
            $temp.find("li:first").css("cursor", "default").siblings().css("cursor", "pointer");
          } else {
            $temp.find("span").css("left", "50%");
            $temp.find("li:first").css("cursor", "pointer").siblings().css("cursor", "default");
          }
          $scope.selectedType = selectedType;
        };
      }
    };
  });
});
