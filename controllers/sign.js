var validator = require('validator'),
  sanitize = require('sanitizer').sanitize;
var crypto = require('crypto');
var config = require('../config').config;

var User = require('../managers/user');

/**
 * Show user login page.
 *
 * @param  {HttpRequest} req
 * @param  {HttpResponse} res
 */
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

/**
 * Handle user login.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.signin = function(req, res, next) {
  var user_id = validator.trim(sanitize(req.body.id));
  var password = validator.trim(sanitize(req.body.password));
  var remember = !! req.body.remember;

  if (!user_id || !password) {
    return res.render('signin', {
      error: '信息不完整。'
    });
  }

  User.getUserByName(user_id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('signin', {
        error: '这个用户不存在。'
      });
    }
    // password = md5(password);
    if (password !== user.password) {
      return res.render('signin', {
        error: '密码错误。'
      });
    }
    // store session cookie
    gen_session(user, remember, req, res);
    //todo cookie
    // console.dir(req.headers);
    // if (remember) {
    //   req.session.cookie.expires = false;
    //   req.session.cookie.maxAge = false;
    // }
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


// auth_user middleware
exports.auth_user = function(req, res, next) {
  var cookie;
  if (req.session.user) {
    res.locals.current_user = req.session.user;
    next();
  } else if (cookie = req.cookies[config.auth_cookie_name]) {
    var auth_token = decrypt(cookie, config.session_secret);
    var auth = auth_token.split('\t');
    var user_id = auth[0];
    User.getUserByName(user_id, function(err, user) {
      if (err) {
        next(err);
      }
      if (user) {
        req.session.user = user;
        res.locals.current_user = req.session.user;
      }
      next();
    });
  } else {
    next();
  }
};

// private
function gen_session(user, remember, req, res) {
  var auth_token = encrypt(user.id + '\t' + user.name + '\t' + user.password + '\t' + user.email, config.session_secret);
  if (remember) {
    res.cookie(config.auth_cookie_name, auth_token, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30
    }); //cookie 有效期30天
  }
  req.session.user = user;
  res.locals.current_user = req.session.user;
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