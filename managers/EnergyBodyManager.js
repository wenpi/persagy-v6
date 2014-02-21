var RESTClient = require('common/RESTClient')
    , QueryJsonFactory = require('common/QueryJsonFactory')
    , BodyUserManager = require('./BodyUserManager')
    , linq = require('linq');
var collection = 'energybody';
//批量获取
exports.getEnergyBodyArr = function (cb, idArr) {
    var arr = [], jsonQuery, len = idArr.length, i;
    for (i = 0; i < len; i++) {
        jsonQuery = QueryJsonFactory.getUdmQuery(collection);
        jsonQuery.criteria = {
            id: idArr[i]
        };
        arr.push(jsonQuery);
    }
    RESTClient.getJSONArr(undefined, arr, cb);
};
//获取用户权限内的能耗主体
exports.getEnergyBodyByUser = function (cb, userId) {
    BodyUserManager.getBodyUser(function (res, obj) {
        var bodySignArr = linq.From(obj).Select('$.bodySign').ToArray();
        exports.getEnergyBodyArr(function (res1, obj1) {
            cb(null, obj1);
        }, bodySignArr);
    }, userId);
};
//根据用户批量获取能耗主体
exports.getEnergyBodyByUserArr = function (cb, userIdArr) {
    BodyUserManager.getBodyUserByUserArr(function (res, obj) {
        var bodySignArr = linq.From(obj).Select('$.bodySign').ToArray();
        exports.getEnergyBodyArr(function (res1, obj1) {
            cb(null, obj1);
        }, bodySignArr);

    }, userIdArr);
};