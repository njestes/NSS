//------------------------------------------------------------------------------
//----- MainVM ---------------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2014 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//   purpose:
//discussion:   This is where the majority of your code-behind goes: data access, click events, complex calculations,
//              business rules validation, etc. ViewModels are typically built to reflect a View.
//              For example, if a View contains a ListBox of objects, a Selected object, and a Save button, the ViewModel will have an ObservableCollection ObectList,
//              Model SelectedObject, and SaveCommand.
//Comments
//08.18.2014 jkn - Created
//Imports"
///<reference path="../Scripts/typings/knockout/knockout.d.ts"/>
///<reference path="../Models/Model/Model.ts"/>
// Class
var MainViewModel = (function () {
    //Constructor
    //-+-+-+-+-+-+-+-+-+-+-+-
    function MainViewModel(stateID, url) {
        this._stateID = stateID;
        this._URL = url;

        this.init();
    }
    //Methods
    //-+-+-+-+-+-+-+-+-+-+-+-
    MainViewModel.prototype.SelectModel = function (model) {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;
        var mod;
        switch (model.ModelType) {
            case 2 /* REGRESSION */:
        }

        //get parameters from service
        $.get(this._URL + '/' + model.Model + '/def?state=' + this._stateID, function (m) {
            return model.LoadParameters(m);
        }, "json");
        this.SelectedModel(model);
        this.Message("Selected Model ... " + model.Description);
        this.reset();
    };
    MainViewModel.prototype.SelectStudy = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

        //calculates the parameters using SS basin char services
        this.StudyAreaSelected(true);

        var pcount = this.SelectedModel().Parameters().length;

        this.Message("Selected Study ...");
        //$.post(url, { workspaceId: this._workspaceID, Year: this.SelectedYear(), f: "json" }, wu=> this.loadWateruse(wu), "json");
    };

    MainViewModel.prototype.AcceptStudyArea = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

        //For selected model, and selected StudyArea
        //request params
        this.StudyAreaAccepted(true);
        this.ShowReport(true);
        //$.get(this._URL + 'models//def?state=' + this._stateID, wu=> this.loadModels(wu), "json");
    };
    MainViewModel.prototype.EditStudyArea = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

        this.StudyAreaAccepted(false);
        //$.post(url, { workspaceId: this._workspaceID, Year: this.SelectedYear(), f: "json" }, wu=> this.loadWateruse(wu), "json");
    };
    MainViewModel.prototype.ClearStudyArea = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

        this.StudyAreaAccepted(false);
        //$.post(url, { workspaceId: this._workspaceID, Year: this.SelectedYear(), f: "json" }, wu=> this.loadWateruse(wu), "json");
    };
    MainViewModel.prototype.Compute = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

        //http://50.17.205.92/regressionservice/models?state=IA
        this.IsComputed(true);

        this.ShowReport(true);
        var model = this.SelectedModel();

        $.get(this._URL + '/' + model.Model + '/estimate?state=' + this._stateID, { parameters: model.ToJson() }, function (m) {
            return model.LoadResults(m);
        }, "json");
    };
    MainViewModel.prototype.Reset = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;
        this.SelectedSenerio(0 /* UNDEFINED */);
        this.reset();
        //$.post(url, { workspaceId: this._workspaceID, Year: this.SelectedYear(), f: "json" }, wu=> this.loadWateruse(wu), "json");
    };

    //Helper Methods
    //-+-+-+-+-+-+-+-+-+-+-+-
    MainViewModel.prototype.init = function () {
        var _this = this;
        //empty list
        this.SelectedSenerio = ko.observable(0 /* UNDEFINED */);
        this.ShowReport = ko.observable(false);
        this.StudyAreaSelected = ko.observable(false);
        this.StudyAreaAccepted = ko.observable(false);
        this.IsComputed = ko.observable(false);
        this.IsStudyAreaOmitted = ko.observable(false);
        this.SelectedModel = ko.observable(new Model());
        this.ModelList = ko.observableArray(new Array());
        this.Message = ko.observable("");

        if (this._stateID === "")
            return;

        //retrieves list of models
        $.get(this._URL + '?state=' + this._stateID, function (wu) {
            return _this.loadModels(wu);
        }, "json");
    };
    MainViewModel.prototype.reset = function () {
        this.StudyAreaSelected(false);
        this.StudyAreaAccepted(false);
        this.IsComputed(false);
        this.IsStudyAreaOmitted(false);
        this.ShowReport(false);
    };
    MainViewModel.prototype.loadModels = function (list) {
        var _this = this;
        list.forEach(function (l) {
            return _this.ModelList.push(Model.FromJSON(l));
        });
    };
    return MainViewModel;
})();
//# sourceMappingURL=MainViewModel.js.map
