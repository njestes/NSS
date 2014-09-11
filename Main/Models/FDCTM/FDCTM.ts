//------------------------------------------------------------------------------
//----- FDCTM ---------------------------------------------------------------
//------------------------------------------------------------------------------

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
class FDCTM extends Model {
    //Properties

    //Constructor
    constructor(d: string) {
        super("FDCTM", ModelType.REGRESSION, d);
    }//end constructor

    public static FromJSON(jsn: Object): FDCTM {
        return super.FromJSON(jsn);
    }//end FromJSON

    public ToJson(): string {

        return '';
    }
    public LoadResults(jsn: Object) {

    }

}
