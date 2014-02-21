var http = require('http')
    , RESTClient = require('common/RESTClient')
    , Constants = require('common/Constants')
    , QueryJsonFactory = require('common/QueryJsonFactory');
var collection = 'alarm';
exports.getAlarmType = function (cb) {
    var jsonQuery = QueryJsonFactory.getUdmQuery('alarmtype');
    jsonQuery.criteria = {
        alarmSort: 1
    };
    RESTClient.getJSON(undefined, jsonQuery, cb);
};
exports.convert2AlarmTypeEnum = function (oraData) {
    var i = 0, len = 0, pro;
    var rst = {
        EnumSign: oraData.alarmTypeId,
        EnumName: oraData.alarmTypeName
    };
    if (oraData.property) {
        len = oraData.property.length;
        for (i = 0; i < len; i++) {
            pro = oraData.property[i];
            switch (pro.propertyName) {
                case "compareType":
                    rst.EnumCompareType = pro.propertyValue;
                    break;
                case "imgPath":
                    rst.EnumImg = pro.propertyValue;
                    break;
                case "alarmTypeUnit":
                    rst.EnumUnit = pro.propertyValue;
                    break;
                case "isUrgency":
                    rst.IsUrgency = pro.propertyValue;
                    break;
            }
        }
    }
    return rst;
};
exports.getAlarm = function (cb, bodySign, beginTime, endTime) {
    var jsonQuery = QueryJsonFactory.getBuildingQuery(bodySign, collection, 'emsvdata');
    jsonQuery.criteria = {
        alarmDate: {
            $gte: beginTime + "",
            $lt: endTime + ""
        }
    };
    RESTClient.getJSON(undefined, jsonQuery, cb);
};