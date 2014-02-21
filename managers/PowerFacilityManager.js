var http = require('http')
    , RESTClient = require('common/RESTClient')
    , Constants = require('common/Constants')
    , QueryJsonFactory = require('common/QueryJsonFactory');
//获取所有配电室
exports.getPowerFacility = function (cb, bodySign, level) {
    var jsonQuery = QueryJsonFactory.getBuildingViewQuery("powerfacilityview")
    jsonQuery.criteria = {
        buildingSign: bodySign,
        powerFacilitySign: 1,
        level: level || 4
    };
    RESTClient.getJSON(undefined, jsonQuery, cb);
};
//转换为前台需要的格式
exports.convert2Service = function (buildingSign, oraData) {
    var rst = {};
    rst.BodySign = buildingSign;
    rst.Sign = oraData.sign;
    rst.Name = oraData.name;

    if (oraData.lineNumberList)
        rst.LineNumber = oraData.lineNumberList[0];
    rst.PowerFacilityName = oraData.name;
    rst.type = oraData.type;
    if (oraData.meterList)
        rst.MeterSign = oraData.meterList[0];
    if (oraData.switchGateSignList)
        rst.switchGateSign = oraData.switchGateSignList[0];
    return rst;
};