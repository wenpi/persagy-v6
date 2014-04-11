define(['./module', 'highcharts', 'sagyChart', 'jCal'], function(directives, highcharts, sagyChart) {
  'use strict';
  directives.directive('widgetEnergyCalendar', function() {
    return {
      templateUrl: 'partials/widgets/energy-calendar.html',
      scope: true,
      controller: function($scope, $element, energyCalendarServ, basicInfoServ) {
        var config = basicInfoServ.widgets[$element.data('name')];
        if (!config) {
          alert('配置项缺失.');
        }
        $scope.title = config.title;
        $scope.subtitle = config.subtitle;
        var calendar_option = {};


        function changeMonthColor(stateArr, date) {
          var i = 0,
            className,
            dayArr = $('div[id^=' + calendar_option.cID + 'd_]'),
            selectIndex = 0,
            newDate = new Date(),
            $dom;
          if (date.getMonth() === newDate.getMonth()) {
            selectIndex = newDate.getDate() - 1;
          }
          for (i = 0; i < stateArr.length; i++) {
            $dom = $(dayArr[i]);
            switch (stateArr[i]) {
              case 1:
                className = 'higherDay';
                break;
              case -1:
                className = 'lowerDay';
                break;
              case 0:
                className = 'equalDay';
                break;
            }
            if (i === selectIndex) {
              $dom.addClass('selectedDay');
            }
            $dom.addClass(className);

          }
          calendar_option.callback(date.setDate(selectIndex + 1));
        }

        calendar_option = $element.find('.calendar_jcal').jCal({
          dayOffset: 1,
          scrollSpeed: 0,
          dow: ['一', '二', '三', '四', '五', '六', '日'],
          ms: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          ml: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          drawBack: function(date) {
            energyCalendarServ.getMonthState(date).success(function(json) {
              changeMonthColor(json, date);
            });
          },
          callback: function(date) {
            $scope.curDay = highcharts.dateFormat('%Y.%m.%d', date);
            energyCalendarServ.getDayInfo(date).success(function(json) {
              var unitObj = sagyChart.convertUnit(json.currEnergy, json.unit);
              $scope.curEnergy = unitObj.data;
              unitObj = sagyChart.convertUnit(json.prevWorkSvgEnergy, json.unit);
              $scope.prevWorkDay = unitObj.data;
              unitObj = sagyChart.convertUnit(json.prevNoWorkSvgEnergy, json.unit);
              $scope.prevNotWorkDay = unitObj.data;
              $scope.unit = unitObj.unit;
              //$scope.color='.higherDay'
            });
            return true;
          }
        });

      }
    };
  });
});
