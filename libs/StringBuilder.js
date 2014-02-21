module.exports = function StringBuilder() {
    this._strings_ = new Array;
};
module.exports.prototype.append = function (str) {
    this._strings_.push(str);
};
module.exports.prototype.toString = function () {
    return this._strings_.join("");
};
