var async = require('public_nodejs/async');
var buManager = require('../managers/BuildManager');
var dateFormat = require('common/DateFormat');

//获取集团或者楼的简介
exports.GetCompanyDescription = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var userid = req.body.userId;
                    var bodysign = req.body.bodySign;
                    var bm = new buManager();
                    bm.GetCompanyDescription(userid, bodysign, callback);
                } catch (e) {
                    console.log('GetCompanyDescription执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            var obj = result[0].property;
            if (obj == null || obj.length == 0) {
                res.send('');
                return;
            }
            var descri = '';
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].propertyName == 'Introduction') {
                    descri = obj[i].propertyValue;
                    break;
                }
            }
            res.send({
                describe: descri
            });
        } catch (e) {
            console.log('GetCompanyDescription执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得某用户下所有建筑
exports.GetBuildingByUser = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var userid = req.body.userId;
                    var bm = new buManager();
                    bm.GetBuildingByUser(userid, callback);
                } catch (e) {
                    console.log('GetBuildingByUser执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetBuildingByUser执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得建筑分类
exports.GetBuildingType = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var userid = req.body.userId;
                    var bm = new buManager();
                    bm.GetBuildingType(userid, callback);
                } catch (e) {
                    console.log('GetBuildingType执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetBuildingType执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//节能统计
exports.GetEnergySaving = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var bm = new buManager();
                    bm.GetEnergySaving(bodysign, callback);
                } catch (e) {
                    console.log('GetEnergySaving执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            var obj = result[0];
            var btime = dateFormat.FormatStr('YY.MM.DD', obj.beginTime);
            obj.beginTime = btime;
            res.send(obj);
        } catch (e) {
            console.log('GetEnergySaving执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//用电增幅或跌幅最大前三名
exports.GetPowerAmplit = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var type = req.body.type;
                    var formula = req.body.expression;
                    var timeTypeId = req.body.timeTypeId;
                    var bm = new buManager();
                    bm.GetPowerAmplit(bodysign, type, formula, timeTypeId, callback);
                } catch (e) {
                    console.log('GetPowerAmplit执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            var obj = result[0];
            if (obj == null || obj.length == 0) {
                res.send('');
                return;
            }
            var arr = [];
            for (var i = 0; i < 3; i++) {
                var curr = obj[i];
                if (i >= obj.length) break;
                if (curr == null) continue;

                var o = {
                    name:curr.buildingName,
                    count:curr.benqi,
                    percent: Math.abs(curr.compare),
                    unit: curr.unit
                };
                arr.push(o);
            }
            res.send(arr);
        } catch (e) {
            console.log('GetPowerAmplit执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得节能改造成果
exports.GetSavingResults = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var bm = new buManager();
                    bm.GetSavingResults(bodysign, callback);
                } catch (e) {
                    console.log('GetSavingResults执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetSavingResults执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得各地区或各分户本年能耗占比
exports.GetEnergyHollowPieview = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var type = req.body.type;
                    var bm = new buManager();
                    bm.GetEnergyHollowPieview(bodysign, type, callback);
                } catch (e) {
                    console.log('GetEnergyHollowPieview执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetEnergyHollowPieview执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//本年能耗分项占比(单楼、多楼共有的)
exports.GetEnergyItem = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var type = req.body.type;
                    var bm = new buManager();
                    bm.GetEnergyItem(bodysign, type, callback);
                } catch (e) {
                    console.log('GetEnergyItem执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetEnergyItem执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//下载报表
exports.DownLoadReport = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var templateId = req.body.templateId;
                    var bm = new buManager();
                    bm.DownLoadReport(bodysign, templateId, callback);
                } catch (e) {
                    console.log('DownLoadReport执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('DownLoadReport执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//能耗日历
exports.GetEnergyCalendar = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var time = req.body.time;
                    var bm = new buManager();
                    bm.GetEnergyCalendar(bodysign, time, callback);
                } catch (e) {
                    console.log('GetEnergyCalendar执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetEnergyCalendar执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//工作能耗
exports.GetWorkEnergy = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var time = req.body.time;
                    var bm = new buManager();
                    bm.GetWorkEnergy(bodysign, time, callback);
                } catch (e) {
                    console.log('GetWorkEnergy执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetWorkEnergy执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得功率实时监控
exports.GetRealMonitor = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var bm = new buManager();
                    bm.GetRealMonitor(bodysign, callback);
                } catch (e) {
                    console.log('GetRealMonitor执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetRealMonitor执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//变压器功率最高前三名
exports.GetTransformer = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var type = req.body.type;
                    var bm = new buManager();
                    bm.GetTransformer(bodysign, type, callback);
                } catch (e) {
                    console.log('GetTransformer执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            var arr = [];
            var obj = result[0];
            if (obj == null) obj = arr;
            for (var i = 0; i < 3; i++) {
                if (obj[i] == null) break;
                arr.push(obj[i]);
            }
            res.send(arr);
        } catch (e) {
            console.log('GetTransformer执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//温度最高前三名
exports.GetVerticalBarview = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var type = req.body.type;
                    var bm = new buManager();
                    bm.GetVerticalBarview(bodysign, type, callback);
                } catch (e) {
                    console.log('GetVerticalBarview执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            var arr = [];
            var obj = result[0];
            if (obj == null) obj = arr;
            for (var i = 0; i < 3; i++) {
                if (obj[i] == null) break;
                arr.push(obj[i]);
            }
            res.send(arr);
        } catch (e) {
            console.log('GetVerticalBarview执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得当年建筑总能耗
exports.GetBuildingEnergy = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var bm = new buManager();
                    bm.GetBuildingEnergy(bodysign, callback);
                } catch (e) {
                    console.log('GetBuildingEnergy执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            var obj = result[0];
            var unit = obj.unit;
            var lastArray = obj.lastArray;
            var currentArray = obj.currentArray;
            var lastArr = [];
            var currArr = [];
            var xData = [];
            var yData = [];
            var optional = [];
            if (currentArray == null) currentArray = currArr;
            if (lastArray == null) lastArray = lastArr;
            var count = currentArray.length;
            if (currentArray.length < lastArray.length) count = lastArray.length;
            for (var i = 0; i < count; i++) {
                var curr = currentArray[i];
                var last = lastArray[i];
                if (curr == null) {
                    curr = {};
                    curr.data = null;
                    var preDate = new Date(currentArray[i - 1].timefrom);
                    preDate.setDate(preDate.getDate() + 1);
                    curr.timefrom = preDate.getTime();
                    currentArray.push(curr);
                }
                xData.push((new Date(curr.timefrom)).getTime());
                currArr.push(parseFloat(curr.data));
                if (last != null) {
                    lastArr.push(parseFloat(last.data));
                    if (parseFloat(curr.data) > parseFloat(last.data))
                        optional.push(i);
                }
            }
            yData.push(currArr);
            yData.push(lastArr);
            res.send({
                unit: unit,
                xData: xData,
                yData: yData,
                optional: optional
            });
        } catch (e) {
            console.log('GetBuildingEnergy执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得建筑能耗趋势
exports.GetEnergyTrend = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var isenergy = req.body.isEnergy;
                    var energytype = req.body.energyType;
                    var timetype = req.body.timeType;
                    var bm = new buManager();
                    bm.GetEnergyTrend(bodysign, isenergy, energytype, timetype, callback);
                } catch (e) {
                    console.log('GetEnergyTrend执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0 || result[0] == null) {
                res.send('');
                return;
            }
            var obj = result[0];
            obj.highProbe = isNaN(parseFloat(obj.highProbe)) == true ? 0 : Math.abs(obj.highProbe);
            res.send(obj);
        } catch (e) {
            console.log('GetEnergyTrend执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得所有的能耗、时间类型
exports.GetEnergyTimeType = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bm = new buManager();
                    bm.GetEnergyTimeType(callback);
                } catch (e) {
                    console.log('GetEnergyTimeType执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0 || result[0] == null) {
                res.send('');
                return;
            }
            var obj = result[0];
            var energyTypeArr = [];
            var timeTypeArr = [];
            var earr = obj.EnergyType == null ? energyTypeArr : obj.EnergyType;
            var tarr = obj.TimeType == null ? timeTypeArr : obj.TimeType;
            for (var i = 0; i < earr.length; i++) {
                energyTypeArr.push({
                    energyTypeId: earr[i].id,
                    energyTypeName: earr[i].name,
                    unit: earr[i].unit
                });
            }
            for (var i = 0; i < tarr.length; i++) {
                timeTypeArr.push({
                    timeTypeId: tarr[i].id,
                    timeTypeName: tarr[i].name,
                    "default": tarr[i].default
                });
            }
            res.send({
                energyTypeArr: energyTypeArr,
                timeTypeArr: timeTypeArr
            });
        } catch (e) {
            console.log('GetEnergyTimeType执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//取得报表集合
exports.GetReportList = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var bm = new buManager();
                    bm.GetReportList(bodysign, callback);
                } catch (e) {
                    console.log('GetReportList执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetReportList执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//获取上月指标数据
exports.GetLastMonthIndicatorview = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var bm = new buManager();
                    bm.GetLastMonthIndicatorview(bodysign, callback);
                } catch (e) {
                    console.log('GetLastMonthIndicatorview执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetLastMonthIndicatorview执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//获取建筑湿度趋势
exports.GetBuildingHumiditytrendview = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var type = req.body.type;
                    var timeType = req.body.timeType;
                    var bm = new buManager();
                    bm.GetBuildingHumiditytrendview(bodysign, type, timeType, callback);
                } catch (e) {
                    console.log('GetBuildingHumiditytrendview执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetBuildingHumiditytrendview执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};

//获取建筑温度趋势
exports.GetBuildingTemperaturetrendview = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var type = req.body.type;
                    var timeType = req.body.timeType;
                    var bm = new buManager();
                    bm.GetBuildingTemperaturetrendview(bodysign, type, timeType, callback);
                } catch (e) {
                    console.log('GetBuildingTemperaturetrendview执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
                    res.send('');
                }
            }
    ], function (err, result) {
        try {
            if (result == null || result.length == 0) {
                res.send('');
                return;
            }
            res.send(result[0]);
        } catch (e) {
            console.log('GetBuildingTemperaturetrendview执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });
};