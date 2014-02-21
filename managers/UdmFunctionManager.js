var RESTClient = require('common/RESTClient')
    , QueryJsonFactory = require('common/QueryJsonFactory')
    , UserManager = require('./UserManager')
    , GroupManager = require('./GroupManager')
    , linq = require('linq');
var collection = 'udmfunction';
//模块
exports.getAllFunction = function (cb) {
    var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
    RESTClient.getJSON(undefined, jsonQuery, cb);
};
exports.getFunctionArr = function (fIdArr, cb) {
    var len = fIdArr.length, jsonQuery, i, jsonQueryArr = [];
    for (i = 0; i < len; i++) {
        jsonQuery = QueryJsonFactory.getUdmQuery(collection);
        jsonQuery.criteria = {
            id: fIdArr[i]
        };
        jsonQueryArr.push(jsonQuery);
    }

    RESTClient.getJSONArr(undefined, jsonQueryArr, function (res, obj) {
        var rstArr = RESTClient.getCommonJsonArr(obj);
        cb(null, rstArr);
    });
};
//用户权限内模块
exports.getFunctionByUser = function (cb, userId) {
    GroupManager.getGroupsByUser(function (req, res) {
        var arr = linq.From(res[0].function).Select('$.FunctionId').ToArray();
        exports.getFunctionArr(arr, function (o, e) {
            cb(null, e);
        });
    }, userId);
};