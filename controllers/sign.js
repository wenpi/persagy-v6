var validator = require('validator');
var sanitize = require('sanitizer').sanitize;
var crypto = require('crypto');
var config = require('../config').config;

var User = require('../managers/user');

exports.showSignin = function(req, res) {
  if (res.locals.current_user) {
    res.render('index', {
      error: '请勿重复登陆'
    });
  } else {
    req.session._loginReferer = req.headers.referer;
    res.render('signin');
  }
};

exports.signin = function(req, res, next) {
  var user_id = validator.trim(sanitize(req.body.id));
  var password = validator.trim(sanitize(req.body.password));
  var remember = !! req.body.remember;

  if (!user_id || !password) {
    return res.render('signin', {
      error: '信息不完整。'
    });
  }

  User.getUserByName(user_id, password, function(err, _info) {
    var info = _info;
    if (err) {
      return next(err);
    }
    if (!info) {
      return res.render('signin', {
        error: '用户名或密码不正确'
      });
    }
    var user = {
      id: user_id,
      name: info.userName,
      password: password,
      bodySign: info.bodySign,
      isSingle: info.isSingle
    };
    gen_session(user, info.functionList, remember, req, res);
    res.redirect('/');
  });
};

// sign out
exports.signout = function(req, res) {
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, {
    path: '/'
  });
  res.redirect('/');
};

exports.auth_user = function(req, res, next) {
  var cookie;
  if (req.session.user && req.session.function_list) {
    res.locals.current_user = req.session.user;
    res.locals.function_list = req.session.function_list;
    next();
  } else if (cookie = req.cookies[config.auth_cookie_name]) {
    var auth_token = decrypt(cookie, config.session_secret);
    var auth = auth_token.split('\t');
    var user_id = auth[0];
    var user_psd = auth[2];
    User.getUserByName(user_id, user_psd, function(err, _info) {
      var info = _info;
      var user;
      if (err) {
        next(err);
      }
      if (info) {
        user = {
          id: user_id,
          name: info.userName,
          password: user_psd,
          bodySign: info.bodySign,
          isSingle: info.isSingle
        };
        res.locals.current_user = req.session.user = user;
        res.locals.function_list = req.session.function_list = info.functionList;
      }
      next();
    });
  } else {
    next();
  }
};

function gen_session(user, functionList, remember, req, res) {
  var auth_token = encrypt(
    user.id + '\t' +
    user.name + '\t' +
    user.password + '\t' +
    user.bodySign + '\t' +
    user.isSingle + '\t' +
    user.functionList, config.session_secret);
  if (remember) {
    res.cookie(config.auth_cookie_name, auth_token, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30
    }); //cookie 有效期30天
  }
  res.locals.current_user = req.session.user = user;
  res.locals.function_list = req.session.function_list = functionList;
}

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

function randomString(size) {
  size = size || 6;
  var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
}
