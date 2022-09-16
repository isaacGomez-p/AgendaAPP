import { UserEntity } from "./userEntity";

export class ProductEntity{
    productId: number;
    name: String;
    variety: String;
    code: String;
    //No mapeado
    edicion: boolean;
    agregar: boolean;
    user: UserEntity;
}