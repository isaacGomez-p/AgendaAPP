import { LandEntity } from "./finca";
import { Planilla } from "./planilla";
import { ProductEntity } from "./producto";

export class Siembra{
    id: number;
    land: LandEntity;
    batch: string; // LOTE
    groove: number; //SURCO
    //producto: String;
    variedad: String; // tiene producto
    plants: number; //plantas
    year: number;
    week: number;
    day: number;
    agricultor_id: number;
    code: string;
    landCode: string; // código de finca
    spreadsheets: Planilla[];
    product: ProductEntity
    //No mapeado
    agregar: boolean;    
}