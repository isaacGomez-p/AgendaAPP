export class Siembra{
    id: number;
    land_id: number;
    batch: string; // LOTE
    groove: number; //SURCO
    producto: String;
    variedad: String; // tiene producto
    plants: number; //plantas
    year: number;
    week: number;
    day: number;
    agricultor_id: number;
    code: string;
    landCode: string; // código de finca
    //No mapeado
    agregar: boolean;    
}