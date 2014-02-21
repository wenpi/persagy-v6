exports.index = function(req, res, next) {
  if (res.locals.current_user) {
    res.render('index');
  } else {
    res.render('signin', {
      error: '请先登录'
    });
  }
};
