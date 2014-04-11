define(['./module'], function(controllers) {
  'use strict';
  controllers.controller('navCtrl', ['$scope', 'navCtrlServ', 'basicInfoServ',
    function($scope, navCtrlServ, basicInfoServ) {
      var allTypes = {};
      $scope.buildings = [];
      $scope.types = [];
      $scope.typeList = [{
        name: '按默认排序',
        id: 'all'
      }, {
        name: '按地区排序',
        id: 'area'
      }, {
        name: '按类型排序',
        id: 'type'
      }];
      $scope.selectedType = $scope.typeList[0];
      navCtrlServ.getBuildings().success(function(data) {
        $scope.selectedBuilding = data[0];
        var i = 0,
          j = 0,
          temp;
        for (i = 0; i < data.length; i++) {
          temp = data[i].funcList;
          for (j = 0; j < temp.length; j++) {
            temp[j].url += '?userId=' + basicInfoServ.userId + '&bodySign=' + data[i].sign;
          }
        }

        $scope.buildings = data;
      });
      navCtrlServ.getTypes().success(function(data) {
        allTypes = data;
        $scope.types = allTypes.all;
      });

      $scope.selectType = function(item) {
        $scope.types = allTypes[item.id];
        $scope.selectedType = item;
        $(".buildC_select .C_selectText").text(item.name);
      };

      $scope.selectBuilding = function(item) {
        $scope.selectedBuilding = item;
      };

      $scope.isShowBuilding = function(building, type) {
        if ($scope.selectedType.id === 'all') {
          return true;
        } else {
          return building[$scope.selectedType.id] === $scope.types[type].name;
        }
      };

      $scope.showBuildingList = function(e) {
        var that = e.currentTarget,
          $thisParentNext = $(that).parent().next("div.n_option_main"),
          thisHidden = $thisParentNext.is(":hidden");
        if (thisHidden) {
          $(that).children("div.o_arr").addClass("o_arrCur");
          $thisParentNext.slideDown("fast");
        } else {
          $(that).children("div.o_arr").removeClass("o_arrCur");
          $thisParentNext.slideUp("fast");
        }
      };

    }
  ]);
});
