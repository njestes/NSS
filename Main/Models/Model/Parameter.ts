//------------------------------------------------------------------------------
//----- Table ---------------------------------------------------------------
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


///<reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
// Interface
interface IParameter {
    name: string;
    value: KnockoutObservable<number>;
}//end IColumn


// Class
class Parameter implements IParameter {
    //Properties
    public name: string;
    public value: KnockoutObservable<number>;
    // Constructor
    constructor(n: string, v: number) {
        this.name = n;
        this.value = ko.observable(v);
    }//end constructor

    public static FromJSON(obj: Object): Parameter {
        var name: string = obj.hasOwnProperty("name") ? obj["name"] : "---";
        var value: number = obj.hasOwnProperty("value") ? obj["value"] : -9999;

        return new Parameter(name, value);
    }//end FromJSON

}//end class