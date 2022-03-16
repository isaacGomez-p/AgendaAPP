import { NumeroPlanilla } from "./numeroPlanilla";
import { Siembra } from "./siembra";

export class Planilla{
    spreadsheetId: number;
    filingDate: Date; //Fecha de formulación
    lote: String;
    name: String;
    activity: String;
    control: String;
    prevention: String;
    fertilization: String;    
    dose: number;
    totalMix: number;
    totalDose: number;
    madeBy: String;
    applicationDate: Date;
    status: String;
    quality: number;
    code: string;
    codeNSpreadsheet: string;
    codeLand: string;
    plantingMaps: Siembra[];
    priority: number;

    producto: String;
    landId: number;
    agricultor_id: number;
    nSpreadsheet: NumeroPlanilla;

    //No mapeadas
    fincaNombre: String;
    agregar: boolean;
    fechaString: string;
    fechaAplicacionString: string;
}