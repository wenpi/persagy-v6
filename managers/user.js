var configuration = require('../config').config;

//根据用户名获取用户
exports.getUserByName = function (userid, pass, callback) {
    var queryFactory = require('common/QueryJsonFactory');
    var restClient = require('common/RESTClient');
    var criteria = {
        userId: userid,
        password: pass
    };
    var query = queryFactory.getDefaultQuery('basepageview', '0000', 'basepageview', 'getuserview', 'select', criteria);
    restClient.getJSON(configuration.serviceUrlNew, query, callback);
};