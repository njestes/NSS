
var Model = (function () {
    function Model(m, mt, d) {
        if (typeof m === "undefined") { m = ""; }
        if (typeof mt === "undefined") { mt = 0 /* UNDEFINED */; }
        if (typeof d === "undefined") { d = ""; }
        this.Model = m;
        this.ModelType = mt;
        this.Description = d;

        this.Parameters = ko.observableArray([]);
        this.StartDate = ko.observable(this.addDay(new Date(), -1));
        this.EndDate = ko.observable(this.addDay(new Date(), -1));
        this.MinDateRange = ko.observable(new Date(1900, 1, 1));
        this.MaxDateRange = ko.observable(this.addDay(new Date(), -1));
    }
    Model.FromJSON = function (jsn) {
        var model = jsn.hasOwnProperty("ModelType") ? jsn["ModelType"] : "";
        var type = jsn.hasOwnProperty("ModelType") ? this.ModelTypeFromString(jsn["ModelType"]) : 0 /* UNDEFINED */;
        var description = jsn.hasOwnProperty("Description") ? jsn["Description"] : "";

        return new Model(model, type, description);
    };

    Model.prototype.LoadParameters = function (jsn) {
        var _this = this;
        if (this.Parameters().length > 0)
            return;
        var params = jsn.hasOwnProperty("Parameters") ? jsn["Parameters"] : null;

        if (params != null) {
            params.forEach(function (p) {
                return _this.Parameters.push(Parameter.FromJSON(p));
            });
        }
    };
    Model.prototype.ToJson = function () {
        return '';
    };
    Model.prototype.LoadResults = function (jsn) {
    };
    Model.ModelTypeFromString = function (m) {
        switch (m) {
            case "PRMS":
                return 1 /* PRMS */;
            case 'FDCTM':
                return 2 /* REGRESSION */;
            case 'FLA':
                return 3 /* SIMILAR */;
            default:
                return 0 /* UNDEFINED */;
        }
    };
    Model.prototype.addDay = function (d, days) {
        try  {
            var dayAsTime = 1000 * 60 * 60 * 24;
            return new Date(d.getTime() + days * dayAsTime);
        } catch (e) {
            return d;
        }
    };
    return Model;
})();

var ModelType;
(function (ModelType) {
    ModelType[ModelType["UNDEFINED"] = 0] = "UNDEFINED";
    ModelType[ModelType["PRMS"] = 1] = "PRMS";
    ModelType[ModelType["REGRESSION"] = 2] = "REGRESSION";
    ModelType[ModelType["SIMILAR"] = 3] = "SIMILAR";
})(ModelType || (ModelType = {}));
