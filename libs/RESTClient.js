var http = require('http')
    , https = require('https')
    , logger = require('./Logger')
    , config = require('./config')
    , rc = require('../public_nodejs/rest-client')
    , StringBuilder = require('./StringBuilder');
exports.getJSON = function (url, query, cb) {
    url = (url || config.ServiceViewUrl) + encodeURIComponent('[' + JSON.stringify(query) + ']');
    rc.send({
        url: url
    }, function (res, obj) {
        cb(null, exports.getJsonContent(obj));
    });
};
//普通返回
exports.getJsonContent = function (obj) {
    var rst = obj[0].content;
    return rst;
};
exports.getCommonJsonArr = function (obj) {
    var len = obj.length, len1, i, j, rstArr = [], item;
    for (i = 0; i < len; i++) {
        if (!obj[i]) {
            continue;
        }
        len1 = obj[i].length;
        for (j = 0; j < len1; j++) {
            item = obj[i][j];
            if (!item) {
                continue;
            }
            rstArr.push(item);
        }
    }
    return rstArr;
};
//数组查询
exports.getJSONArr = function (url, queryArr, cb) {
    var stringBuilder = new StringBuilder(), len = queryArr.length, i = 0;
    stringBuilder.append('[');
    for (i = 0; i < len; i++) {
        stringBuilder.append(JSON.stringify(queryArr[i]));
        if (i < len - 1) {
            stringBuilder.append(',')
        }
    }
    stringBuilder.append(']');
    url = (url || config.ServiceViewUrl) + encodeURIComponent(stringBuilder.toString());
    rc.send({
        url: url
    }, function (res, obj) {
        var length = obj.length, j = 0, contentArr = [];
        for (j = 0; j < length; j++) {
            contentArr.push(obj[j].content);
        }
        cb(null, contentArr);
    });
};
