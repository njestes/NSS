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
class MainViewModel {
    //Properties
    //-+-+-+-+-+-+-+-+-+-+-+-
    private _stateID: string;
    private _URL: string;

    //Knockout Properties
    //-+-+-+-+-+-+-+-+-+-+-+-
    public StudyAreaSelected: KnockoutObservable<boolean>;
    public StudyAreaAccepted: KnockoutObservable<boolean>;
    public IsComputed: KnockoutObservable<boolean>;
    public IsStudyAreaOmitted: KnockoutObservable<boolean>
    public SelectedSenerio: KnockoutObservable<ModelType>;  
    public SelectedModel: KnockoutObservable<IModel>; 
    public ModelList: KnockoutObservableArray<IModel>;

    public ShowReport: KnockoutObservable<boolean>;
    public Message: KnockoutObservable<string>;
    //Constructor
    //-+-+-+-+-+-+-+-+-+-+-+-
    constructor(stateID: string, url:string) {
        this._stateID = stateID;
        this._URL = url;

        this.init();
    }
    //Methods
    //-+-+-+-+-+-+-+-+-+-+-+-
    public SelectModel(model: IModel) {
        if (this.SelectedSenerio() == ModelType.UNDEFINED) return;
        var mod: IModel;
        switch(model.ModelType){
            case ModelType.REGRESSION:
                
        }

        //get parameters from service
        $.get(this._URL +'/'+ model.Model + '/def?state=' + this._stateID, m=> model.LoadParameters(m), "json");
        this.SelectedModel(model);
        this.Message("Selected Model ... " + model.Description);
        this.reset();
    }
    public SelectStudy() {
        if (this.SelectedSenerio() == ModelType.UNDEFINED) return;
        //calculates the parameters using SS basin char services
        this.StudyAreaSelected(true);

        var pcount: number = this.SelectedModel().Parameters().length;

        this.Message("Selected Study ...");
        //$.post(url, { workspaceId: this._workspaceID, Year: this.SelectedYear(), f: "json" }, wu=> this.loadWateruse(wu), "json");

    }//end SelectStudy

    public AcceptStudyArea() {
        if (this.SelectedSenerio() == ModelType.UNDEFINED) return;
        //For selected model, and selected StudyArea
        //request params

        this.StudyAreaAccepted(true);
        this.ShowReport(true);

        //$.get(this._URL + 'models//def?state=' + this._stateID, wu=> this.loadModels(wu), "json");

    }//end SelectStudy
    public EditStudyArea() {
        if (this.SelectedSenerio() == ModelType.UNDEFINED) return;

        this.StudyAreaAccepted(false);

        //$.post(url, { workspaceId: this._workspaceID, Year: this.SelectedYear(), f: "json" }, wu=> this.loadWateruse(wu), "json");

    }//end SelectStudy
    public ClearStudyArea() {
        if (this.SelectedSenerio() == ModelType.UNDEFINED) return;


        this.StudyAreaAccepted(false);

        //$.post(url, { workspaceId: this._workspaceID, Year: this.SelectedYear(), f: "json" }, wu=> this.loadWateruse(wu), "json");

    }//end SelectStudy
    public Compute() {
        if (this.SelectedSenerio() == ModelType.UNDEFINED) return;

        //http://50.17.205.92/regressionservice/models?state=IA
        this.IsComputed(true);

        this.ShowReport(true);
        var model = this.SelectedModel();

            $.get(this._URL + '/' + model.Model + '/estimate?state=' + this._stateID, { parameters:model.ToJson()  }, m=> model.LoadResults(m), "json");

    }//end SelectStudy
    public Reset() {
        if (this.SelectedSenerio() == ModelType.UNDEFINED) return;
        this.SelectedSenerio(ModelType.UNDEFINED);
        this.reset();

        //$.post(url, { workspaceId: this._workspaceID, Year: this.SelectedYear(), f: "json" }, wu=> this.loadWateruse(wu), "json");

    }//end SelectStudy
    //Helper Methods
    //-+-+-+-+-+-+-+-+-+-+-+-
    private init() {
        //empty list
        this.SelectedSenerio = ko.observable(ModelType.UNDEFINED);
        this.ShowReport = ko.observable(false);
        this.StudyAreaSelected = ko.observable(false);
        this.StudyAreaAccepted = ko.observable(false);
        this.IsComputed = ko.observable(false);
        this.IsStudyAreaOmitted = ko.observable(false);
        this.SelectedModel = ko.observable(new Model());
        this.ModelList = ko.observableArray(new Array());
        this.Message = ko.observable("");

        if (this._stateID === "") return;
        //retrieves list of models

        $.get(this._URL + '?state=' + this._stateID, wu=> this.loadModels(wu), "json");

    } 
    private reset() {
        this.StudyAreaSelected(false);
        this.StudyAreaAccepted(false);
        this.IsComputed(false);
        this.IsStudyAreaOmitted(false);
        this.ShowReport(false);
    }
    private loadModels(list: Array<IModel>) {
        
        list.forEach(l=> this.ModelList.push(Model.FromJSON(l)));
        
    }   

}//end class

