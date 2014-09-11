//------------------------------------------------------------------------------
//----- Model ------------------------------------------------------------------
//------------------------------------------------------------------------------

//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+

// copyright:   2014 WiM - USGS

//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  
//          
//discussion:
//

//Comments
//08.20.2014 jkn - Created


//Imports"
///<reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
///<reference path="Parameter.ts"/>

// Interface
interface IModel {
    Model: string;
    ModelType: ModelType;
    Description: string;
    Parameters: KnockoutObservableArray<IParameter>;

    LoadParameters(jsn: Object);
    LoadResults(jsn: Object);
    ToJson();

}//end IModel

// Class
class Model implements IModel {
    //Properties
    public Model: string;
    public ModelType: ModelType;
    public Description: string;
    public Parameters: KnockoutObservableArray<IParameter>;

    public MinDateRange: KnockoutObservable<Date>;
    public MaxDateRange: KnockoutObservable<Date>;
    public StartDate: KnockoutObservable<Date>;
    public EndDate: KnockoutObservable<Date>;
    // Constructor
    constructor(m: string = "", mt: ModelType= ModelType.UNDEFINED, d: string = "") {
        this.Model = m;
        this.ModelType = mt;
        this.Description = d;

        this.Parameters = ko.observableArray([]);
        this.StartDate = ko.observable(this.addDay(new Date(), -1));
        this.EndDate = ko.observable(this.addDay(new Date(), -1));
        this.MinDateRange = ko.observable(new Date(1900, 1, 1));
        this.MaxDateRange = ko.observable(this.addDay(new Date(), -1));

    }//end constructor

    public static FromJSON(jsn: Object): Model {
        var model: string = jsn.hasOwnProperty("ModelType") ? jsn["ModelType"] : "";
        var type: ModelType = jsn.hasOwnProperty("ModelType") ? this.ModelTypeFromString(jsn["ModelType"]) : ModelType.UNDEFINED;
        var description: string = jsn.hasOwnProperty("Description") ? jsn["Description"] : "";

        return new Model(model, type, description);
    }//end FromJSON

    public LoadParameters(jsn: Object) {
        if (this.Parameters().length > 0) return;
        var params: Array<Object> = jsn.hasOwnProperty("Parameters") ? jsn["Parameters"] : null;

        if (params != null) {
            params.forEach(p=> this.Parameters.push(Parameter.FromJSON(p)));
        }
    }
    public ToJson(): string {
        //to json

        return '';
    }
    public LoadResults(jsn: Object) {

    }
    private static ModelTypeFromString(m: string) {

        switch (m) {
            case "PRMS":
                return ModelType.PRMS;
            case 'FDCTM':
                return ModelType.REGRESSION;
            case 'FLA':
                return ModelType.SIMILAR;
            default:
                return ModelType.UNDEFINED;
        }//end switch
    }//end ModelTypeFromString
    private addDay(d: Date, days: number): Date {
        try {
            var dayAsTime: number = 1000 * 60 * 60 * 24;
            return new Date(d.getTime() + days * dayAsTime);
        }
        catch (e) {
            return d;
        }
    }
}//end class

enum ModelType {
    UNDEFINED = 0,
    PRMS = 1,
    REGRESSION = 2,
    SIMILAR = 3
}
