//------------------------------------------------------------------------------
//----- Table ---------------------------------------------------------------
//------------------------------------------------------------------------------
///<reference path="../../Scripts/typings/knockout/knockout.d.ts"/>

// Class
var Parameter = (function () {
    // Constructor
    function Parameter(n, v) {
        this.name = n;
        this.value = ko.observable(v);
    }
    Parameter.FromJSON = function (obj) {
        var name = obj.hasOwnProperty("name") ? obj["name"] : "---";
        var value = obj.hasOwnProperty("value") ? obj["value"] : -9999;

        return new Parameter(name, value);
    };
    return Parameter;
})(); //end class
//# sourceMappingURL=Parameter.js.map
