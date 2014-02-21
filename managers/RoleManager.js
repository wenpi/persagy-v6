var RESTClient = require('common/RESTClient')
    , QueryJsonFactory = require('common/QueryJsonFactory');
var collection = 'udmrole';
//角色
exports.getRole = function (cb, roleId) {
    var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
    jsonQuery.criteria = {
        id: roleId
    };
    RESTClient.getJSON(undefined, jsonQuery, cb);
};
//获取除管理员外的角色
exports.getAllCommonRole = function (cb) {
    var jsonQuery = QueryJsonFactory.getUdmQuery(collection);
    RESTClient.getJSON(undefined, jsonQuery, function (rep, obj) {
        var len = obj.length, i;
        for (i = 0; i < len; i++) {
            if (obj[i].name == '管理员') {
                obj.splice(i,1);
                break;
            }
        }
        cb(null, obj);
    });
};
