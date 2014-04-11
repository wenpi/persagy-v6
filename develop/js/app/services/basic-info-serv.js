define(['./module', 'config', 'jquery'], function(services, _config, $) {
  'use strict';
  var user = JSON.parse($("#user_info").val());
  var config = {};
  if (user.is_single) {
    config = _config.single_building[user.body_sign];
  } else {
    config = _config.multi_building;
  }
  if (!config) {
    alert(user.body_sign + '没有相应的配置文件.');
  }
  config.userId = user.user_id;
  config.bodySign = user.body_sign;
  config.is_single = user.is_single;

  services.value('basicInfoServ', config);
});
