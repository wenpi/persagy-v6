function AlarmManager() {
    this.queryFactory = require('common/QueryJsonFactory');
    this.restClient = require('common/RESTClient');
    this.configuration = require('../config').config;
};

//获取报警
AlarmManager.prototype.GetAlarm = function (bodysign, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0]
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getalarmview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

module.exports = AlarmManager;