var RESTClient = require('common/RESTClient')
    , QueryJsonFactory = require('common/QueryJsonFactory')
    , UserManager = require('./UserManager');
var collection = 'udmgroup';
exports.getGroup = function (cb, groupId) {
    var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
    jsonQuery.criteria = {
        id: groupId
    };
    RESTClient.getJSON(undefined, jsonQuery, cb);
};
//获取用户管辖的组
exports.getGroupsForUser = function (cb, userId) {
    var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
    jsonQuery.criteria = {
        ParentUserId: userId
    };
    RESTClient.getJSON(undefined, jsonQuery, cb);
};
//获取用户归属的组
exports.getGroupsByUser = function (cb, userId) {
    UserManager.getUser(function (o, e) {
        exports.getGroup(function (req, res) {
            cb(null, res)
        }, e[0].GroupId)
    }, userId);
};