var http = require('http')
    , RESTClient = require('common/RESTClient')
    , Constants = require('common/Constants')
    , QueryJsonFactory = require('common/QueryJsonFactory');
//根据楼号获取建筑
exports.getBuildingInfo = function (cb, bodySign) {
    var jsonQuery = QueryJsonFactory.getBuildingQuery(bodySign);
    jsonQuery.criteria.sign = bodySign;
    RESTClient.getJSON(undefined, jsonQuery, cb);
};

