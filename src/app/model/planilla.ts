export class Planilla{
    planilla_id: number;
    fecha_formulacion: Date;
    lote: String;
    actividad: String;
    control: String;
    prevencion: String;
    fertilizacion: String;
    producto: String;
    dosis: number;
    mezcla_total: number;
    total_dosis: number;
    elaborado: String;
    fecha_aplicacion: Date;
    estado: String;
    calidad_ejecucion: String;
    n_planilla: number;
    finca_id: number;

    //No mapeadas
    fincaNombre: String;
}