export class Planilla{
    spreadsheetId: number;
    filingDate: Date; //Fecha de formulación
    lote: String;
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
    quality: String;
    code: string;
    codeNSpreadsheet: string;
    codeLand: string;

    producto: String;
    landId: number;
    agricultor_id: number;
    n_planilla: number;

    //No mapeadas
    fincaNombre: String;
    agregar: boolean;
    fechaString: string;
    fechaAplicacionString: string;
}