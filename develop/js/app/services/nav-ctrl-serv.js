define(['./module'], function(services) {
  'use strict';
  services.factory('navCtrlServ', ['$http', 'basicInfoServ',
    function($http, basicInfo) {
      return {
        getTypes: function() {
          return $http.post('/GetBuildingType', {
            userId: basicInfo.userId
          });
        },
        getBuildings: function() {
          return $http.post('/GetBuilding', {
            userId: basicInfo.userId
          });
        }
      };
    }
  ]);
});
