var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FDCTM = (function (_super) {
    __extends(FDCTM, _super);
    function FDCTM(d) {
        _super.call(this, "FDCTM", 2 /* REGRESSION */, d);
    }
    FDCTM.FromJSON = function (jsn) {
        return _super.prototype.FromJSON.call(this, jsn);
    };

    FDCTM.prototype.ToJson = function () {
        return '';
    };
    FDCTM.prototype.LoadResults = function (jsn) {
    };
    return FDCTM;
})(Model);
