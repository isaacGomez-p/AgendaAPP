import { UserEntity } from "./userEntity";
import { Planilla } from "./planilla"

export class NumeroPlanilla{
    nSpreadsheetId: number;
    creationDate: Date;
    user: UserEntity;
    code: string;
    spreadsheets: Planilla;
    //No mapeado
    agregar: boolean;
}