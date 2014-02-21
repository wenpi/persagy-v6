var User = require('../proxy').User;
// var Topic = require('../proxy').Topic;
// var Tag = require('../proxy').Tag;
var config = require('../config').config;
var EventProxy = require('eventproxy');

exports.index = function(req, res, next) {
  res.render('index');
};