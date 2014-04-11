var buManager = require('../managers/BuildManager');

exports.index = function(req, res) {
  var user;
  if (user = res.locals.current_user) {
    var building_sign = req.params.sign;
    var body_sign, is_single;
    if (building_sign) {
      body_sign = building_sign;
      is_single = true;
    } else {
      body_sign = user.bodySign;
      is_single = user.isSingle;
    }

    res.render('index', {
      user_id: user.id,
      user_name: user.name,
      is_single: is_single,
      body_sign: body_sign,
      user_info_str: JSON.stringify({
        user_id: user.id,
        body_sign: body_sign,
        is_single: is_single
      }),
      function_list: res.locals.function_list
    });
  } else {
    res.redirect('/signin');
  }
};

exports.app_index = function(req, res, next) {
  var user,
    building_sign;
  var bm = new buManager();
  if (user = res.locals.current_user) {
    building_sign = req.query.id;
    bm.GetFunctionDetail(req.params.id, function(err, app_info) {
      if (err) {
        return next(err);
      }
      res.render('app_index', {
        user_id: user.id,
        user_name: user.name,
        user_info_str: JSON.stringify({
          user_id: user.id,
          body_sign: user.bodySign,
          is_single: user.isSingle,
          building_sign: building_sign
        }),
        building_sign: building_sign,
        function_list: res.locals.function_list,
        app_info: {
          name: app_info.name,
          url: app_info.property[4].propertyValue
        }
      });
    });
  } else {
    res.redirect('/signin');
  }
};

exports.report_index = function(req, res, next) {
  var user;
  var bm = new buManager();
  if (user = res.locals.current_user) {
    var body_sign = req.query.bodySign;
    bm.DownLoadReport(body_sign, req.params.id, function(err, report) {
      if (err) {
        return next(err);
      }
      res.redirect(report.fileUrl);
    });
  } else {
    res.redirect('/signin');
  }
};
