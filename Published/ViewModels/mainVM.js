var MainViewModel = (function () {
    function MainViewModel(stateID, url) {
        this._stateID = stateID;
        this._URL = url;

        this.init();
    }
    MainViewModel.prototype.SelectModel = function (model) {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

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

        this.StudyAreaSelected(true);

        var pcount = this.SelectedModel().Parameters().length;

        this.Message("Selected Study ...");
    };

    MainViewModel.prototype.AcceptStudyArea = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

        this.StudyAreaAccepted(true);
        this.ShowReport(true);
    };
    MainViewModel.prototype.EditStudyArea = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

        this.StudyAreaAccepted(false);
    };
    MainViewModel.prototype.ClearStudyArea = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

        this.StudyAreaAccepted(false);
    };
    MainViewModel.prototype.Compute = function () {
        if (this.SelectedSenerio() == 0 /* UNDEFINED */)
            return;

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
    };

    MainViewModel.prototype.init = function () {
        var _this = this;
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
