/**
 * 配置文件
 */
var path = require('path');

exports.config = {
  debug: true,
  name: 'persagy-v6',
  description: '博锐尚格新一代节能系统',
  version: '0.0.1',
  upload_dir: path.join(__dirname, 'public', 'upload'),
  session_secret: 'persagy-v6',
  cookie_secret: 'persagy-v6',
  auth_cookie_name: 'sagy-user',
  port: 3000,
  serviceUrlNew: 'http://192.168.100.22:6666/EMS_Service_V/rest/ServiceView/qureyArrayStr/',
  serviceUrl: 'http://192.168.100.199:8888/EMS_Service_V/rest/ems/json/'
};
