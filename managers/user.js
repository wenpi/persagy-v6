//根据用户名获取用户
exports.getUserByName = function(name, callback) {
  callback(null,{
    name:name,
    password:"123"
  });
};
