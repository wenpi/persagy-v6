function BuildManager() {
    this.queryFactory = require('common/QueryJsonFactory');
    this.restClient = require('common/RESTClient');
    this.configuration = require('../config').config;
};

//取得集团或者某楼的简介
BuildManager.prototype.GetCompanyDescription = function (userid, bodysign, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0]
    };
    var query = this.queryFactory.getDefaultQuery('udm', bodysign, 'udm', 'energybody', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback, true);
};

//取得某用户下所有建筑
BuildManager.prototype.GetBuildingByUser = function (userid, callback) {
    var criteria = {
        userId: userid
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', 'ooo', 'basepageview', 'getbuildingview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得建筑分类
BuildManager.prototype.GetBuildingType = function (userid, callback) {
    var url = this.configuration.serviceUrl + 'GetBuildingType/?jsonString=';
    var query = {
        userId: userid
    };
    this.restClient.getJSON(url, query, callback, true);
};

//取得建筑能耗趋势
BuildManager.prototype.GetEnergyTrend = function (bodysign, isenergy, energytype, timetype, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        isEnergy: parseInt(isenergy),
        energyType: parseInt(energytype),
        timeType: parseInt(timetype)
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getenergytrendview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得报表集合
BuildManager.prototype.GetReportList = function (bodysign,  callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0]
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getcommonreporttemplateview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得当年建筑总能耗
BuildManager.prototype.GetBuildingEnergy = function (bodysign, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0]
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getbuildingenergyview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得功率实时监控
BuildManager.prototype.GetRealMonitor = function (bodysign, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0]
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getrealmonitorview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//↓↓↓↓乔晓峰

//节能统计
BuildManager.prototype.GetEnergySaving = function (bodysign, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0]
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getenergysavingview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得节能改造成果
BuildManager.prototype.GetSavingResults = function (bodysign, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0]
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getsavingresultview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得各地区或各分户本年能耗占比
BuildManager.prototype.GetEnergyHollowPieview = function (bodysign, type, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        type: type
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getenergyhollowpieview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得本年能耗分项占比
BuildManager.prototype.GetEnergyItem = function (bodysign, type, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        type: type
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getsolidpieview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//下载报表
BuildManager.prototype.DownLoadReport = function (bodysign, templateId, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        templateId: templateId
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'downloadreportview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得用电增幅或跌幅最大前三名
BuildManager.prototype.GetPowerAmplit = function (bodysign, type, formula, timeTypeId, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        type: type,
        expression: formula.replace(/\//g,'!!'),
        timeTypeId: parseInt(timeTypeId)
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getpoweramplitview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得能耗日历(单楼)
BuildManager.prototype.GetEnergyCalendar = function (bodysign, time, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        time: time
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getenergycalendarview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得工作能耗(单楼)
BuildManager.prototype.GetWorkEnergy = function (bodysign, time, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        time: time
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getworkenergyview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//变压器功率最高前三名(单楼)
BuildManager.prototype.GetTransformer = function (bodysign, type, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        type: type
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'gethorizontalbarview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//温度最高前三名(单楼)
BuildManager.prototype.GetVerticalBarview = function (bodysign, type, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        type: type
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getverticalbarview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得所有的能耗、时间类型
BuildManager.prototype.GetEnergyTimeType = function (callback) {
    var query = this.queryFactory.getDefaultQuery('basepageview', '0000', 'basepageview', 'getenergytimetypeview', 'select');
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//取得某F的详细信息
BuildManager.prototype.GetFunctionDetail = function (id, callback) {
    var criteria = {
        id: id
    };
    var query = this.queryFactory.getDefaultQuery('udm', '0000', 'udm', 'udmfunction', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback, true);
};

//获取上月指标数据
BuildManager.prototype.GetLastMonthIndicatorview = function (bodysign, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0]
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getlastmonthindicatorview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//获取建筑湿度趋势
BuildManager.prototype.GetBuildingHumiditytrendview = function (bodysign, type, timeType, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        type: parseInt(type),
        timeType: parseInt(timeType)
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getbuildinghumiditytrendview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//获取建筑温度趋势
BuildManager.prototype.GetBuildingTemperaturetrendview = function (bodysign, type, timeType, callback) {
    var criteria = {
        bodySign: bodysign == null || typeof bodysign != 'object' ? bodysign : bodysign[0],
        type: parseInt(type),
        timeType: parseInt(timeType)
    };
    var query = this.queryFactory.getDefaultQuery('basepageview', bodysign, 'basepageview', 'getbuildingtemperaturetrendview', 'select', criteria);
    this.restClient.getJSON(this.configuration.serviceUrlNew, query, callback);
};

//↑↑↑↑乔晓峰

module.exports = BuildManager;
