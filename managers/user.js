var RESTClient = require('common/RESTClient'),
  QueryJsonFactory = require('common/QueryJsonFactory'),
  async = require('async'),
  linq = require('linq'),
  GroupManager = require('./GroupManager'),
  RoleManager = require('./RoleManager'),
  EnergyBodyManager = require('./EnergyBodyManager');
var collection = 'udmuser';
exports.getAllUser = function(cb) {
  var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
  RESTClient.getJSON(undefined, jsonQuery, cb);
};
//根据用户id获取用户
exports.getUserById = function(cb, userId) {
  var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
  jsonQuery.criteria = {
    id: userId
  };
  RESTClient.getJSON(undefined, jsonQuery, cb);
};
//根据用户名获取用户
exports.getUserByName = function(name, callback) {
  callback(null,{
    username:name,
    password:"123"
  });
};
//获取用户所属的组
exports.getUserGroup = function(cb, userId) {
  exports.getUser(function(res, obj) {
    var user = obj[0];
    GroupManager.getGroup(cb, user.GroupId);
  }, userId);
};
//获取组里所有用户
exports.getUserByGroup = function(cb, groupId) {
  var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
  jsonQuery.criteria = {
    GroupId: groupId
  };
  RESTClient.getJSON(undefined, jsonQuery, cb);
};
exports.getUserByGroupArr = function(cb, groupIdArr) {
  var len = groupIdArr.length,
    jsonQuery, i, jsonQueryArr = [];
  for (i = 0; i < len; i++) {
    jsonQuery = QueryJsonFactory.getUdmQuery(collection);
    jsonQuery.criteria = {
      GroupId: groupIdArr[i]
    };
    jsonQueryArr.push(jsonQuery);
  }

  RESTClient.getJSONArr(undefined, jsonQueryArr, function(res, obj) {
    var rstArr = RESTClient.getCommonJsonArr(obj);
    cb(null, rstArr);
  });
};
//用户管理,获取管辖内的组和用户
exports.getAdminBussUser = function(callback, userId) {
  var rst = {};
  async.waterfall(
    [

      function(cb) {
        //获取用户
        exports.getUser(function(res, obj) {
          rst.user = obj[0];
          cb(null, obj[0].id)
        }, userId);
      },
      function(userId, cb) {
        //获取管辖内的组
        GroupManager.getGroupsForUser(function(res, groups) {
          rst.groups = groups;
          cb(null, groups)
        }, userId);
      },
      function(groups, cb) {
        //组内用户
        var groupIdArr = linq.From(groups).Select('$.id').ToArray();
        exports.getUserByGroupArr(function(res, userArr) {
          rst.userArr = userArr;
          cb(null, userArr)
        }, groupIdArr);
      },
      function(userArr, cb) {
        var userIdArr = linq.From(userArr).Select('$.id').ToArray();
        EnergyBodyManager.getEnergyBodyByUserArr(function(res, obj) {
          rst.energyBodyArr = obj;
          cb(null, obj)
        }, userIdArr);
      }
    ],
    function() {
      callback(null, rst);
    }
  );
};