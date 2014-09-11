//------------------------------------------------------------------------------
//----- FDCTM ---------------------------------------------------------------
//------------------------------------------------------------------------------
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2014 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//
//
//   purpose:  Represents the FDCTM model
//
//discussion:
//
//Comments
//08.14.2014 jkn - Created
//Imports"
///<reference path="../Model/Model.ts"/>
// Class
var FDCTM = (function (_super) {
    __extends(FDCTM, _super);
    //Properties
    //Constructor
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
//# sourceMappingURL=FDCTM.js.map
