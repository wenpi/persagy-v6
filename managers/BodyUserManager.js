var RESTClient = require('common/RESTClient')
    , QueryJsonFactory = require('common/QueryJsonFactory');
var collection = 'bodyuser';
//根据用户获取能耗主体关系
exports.getBodyUser = function (cb, userId) {
    var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
    jsonQuery.criteria = {
        userId: userId
    };
    RESTClient.getJSON(undefined, jsonQuery, cb);
};
//批量获取
exports.getBodyUserByUserArr = function (cb, userIdArr) {
    var len = userIdArr.length, jsonQuery, i, jsonQueryArr = [];
    for (i = 0; i < len; i++) {
        jsonQuery = QueryJsonFactory.getUdmQuery(collection);
        jsonQuery.criteria = {
            userId: userIdArr[i]
        };
        jsonQueryArr.push(jsonQuery);
    }

    RESTClient.getJSONArr(undefined, jsonQueryArr, function (res, obj) {
        var rstArr = RESTClient.getCommonJsonArr(obj);
        cb(null, rstArr);
    });
};