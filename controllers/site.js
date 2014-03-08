exports.index = function(req, res) {
  if (res.locals.current_user) {
    res.render('index');
  } else {
    res.redirect('/signin');
  }
};
