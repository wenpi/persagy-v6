/**
 * Module dependencies.
 */

var sign = require('./controllers/sign');
var site = require('./controllers/site');
// var user = require('./controllers/user');
// var message = require('./controllers/message');
// var tag = require('./controllers/tag');
// var topic = require('./controllers/topic');
// var reply = require('./controllers/reply');
// var rss = require('./controllers/rss');
// var upload = require('./controllers/upload');
// var assets = require('./controllers/static');
// var tools = require('./controllers/tools');
// var auth = require('./midderwares/auth');
// var limit = require('./midderwares/limit');
// var status = require('./controllers/status');

module.exports = function (app) {
  // home page
  app.get('/', site.index);

  // sign up, login, logout

  app.get('/signout', sign.signout);
  app.get('/signin', sign.showSignin);
  app.post('/signin', sign.signin);

  // password
  // app.get('/search_pass', sign.showSearchPass);
  // app.post('/search_pass', sign.updateSearchPass);
  // app.get('/reset_pass', sign.showResetPass);
  // app.post('/reset_pass', sign.update_pass);

};
