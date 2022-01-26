import { UserEntity } from "./userEntity";

//Finca
export class LandEntity{
    land_id: number;
    name: String;
    status: number;
    user: UserEntity;
    code: string;
    //No mapeado
    edicion: boolean;
    agregar: boolean;
}