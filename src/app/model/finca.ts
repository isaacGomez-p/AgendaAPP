import { UserEntity } from "./userEntity";

//Finca
export class LandEntity{
    landId: number;
    name: String;
    status: number;
    user: UserEntity;
    code: string;
    //No mapeado
    edicion: boolean;
    agregar: boolean;
}