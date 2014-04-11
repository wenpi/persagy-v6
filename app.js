/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var path = require('path');
var config = require('./config').config;


var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(express.favicon());
app.use(express.static(path.join(__dirname, config.debug ? 'develop' : 'release')));
app.use(express.logger('dev'));

app.use(express.json());
app.use(express.urlencoded());

app.use(express.cookieParser(config.cookie_secret));

app.use(express.session({
  secret: config.session_secret
}));

//改写请求,put ,delete
// app.use(express.methodOverride());
// 
app.use(require('./controllers/sign').auth_user);

//todo  csrf for ajax

// app.use(express.csrf());
// app.use(function(req, res, next) {
//   res.locals.csrf = req.csrfToken();
//   next();
// });

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

app.listen(config.port);
console.log("app listening on port %d in %s mode", config.port, app.settings.env);
