import { UserEntity } from "./userEntity";

export class NumeroPlanilla{
    nSpreadsheetId: number;
    creationDate: Date;
    user: UserEntity;
    code: string;
    //No mapeado
    agregar: boolean;
}