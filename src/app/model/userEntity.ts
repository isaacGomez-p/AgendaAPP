import { ProductEntity } from "./producto";

export class UserEntity{
    id: number;
    firstName: String;
    lastName: String;
    password : String;
    document : String;
    status : number;
    email: String;
    dept: String;
    city: String; 
    products: ProductEntity[];
}