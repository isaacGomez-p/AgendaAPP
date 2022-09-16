import { NumeroPlanilla } from "./numeroPlanilla";
import { Siembra } from "./siembra";
import { UserEntity } from "./userEntity";

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
    executedBy: String;
    applicationDate: Date;
    status: String;
    quality: number;
    code: string;
    codeNSpreadsheet: string;
    codeLand: string;
    plantingMaps: Siembra[];
    priority: String;

    producto: String;
    landId: number;
    agricultor_id: number;
    nSpreadsheet: NumeroPlanilla;

    //No mapeadas
    fincaNombre: String;
    agregar: boolean;
    fechaString: string;
    fechaAplicacionString: string;
    colorQuality: string;
    qualityRango: number; //Rango de 0 - 1

    user: UserEntity;
}