var async = require('public_nodejs/async');
var alarmManager = require('../managers/AlarmManager');

//获取报警
exports.GetAlarm = function (req, res) {
    async.series([
            function (callback) {
                try {
                    var bodysign = req.body.bodySign;
                    var am = new alarmManager();
                    am.GetAlarm(bodysign, callback);
                } catch (e) {
                    console.log('getalarm执行错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
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
            console.log('getalarm执行[send]错误\r\n' + e.stack + '\r\n\r\n\r\n\r\n\r\n\r\n');
            res.send('');
        }
    });

};