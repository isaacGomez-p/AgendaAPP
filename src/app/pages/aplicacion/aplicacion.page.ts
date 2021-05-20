import { Component } from '@angular/core';

@Component({
  selector: 'app-aplicacion',
  templateUrl: 'aplicacion.page.html',
  styleUrls: ['aplicacion.page.scss']
})
export class AplicacionPage {

  listaLotes = ["Lote1", "Lote2", "Lote3"];

  listaEjecucion = ["Ejecutado", "No ejecutado"];

  listaActividad = ["Foliar", "Drench", "Biologic", "Protección Flor (Insect.)", 
    "Protección Flor (Fungi.)",
    "Protección Rebrotes (Insect.)",
    "Protección Rebrotes (Fungi.)",
    "Poda",
    "PBZ",
    "Detonant",
    "Flor",
    "Cosecha",
    "Plateo",
    "Guadaña"]

  constructor() {}

  registrar(form){
    console.log("lote " + form.value.lote);
    console.log("actividad " + form.value.actividad);
    console.log("control " + form.value.control);
    console.log("prevencion" + form.value.prevencion);
    console.log("fertilizacion" + form.value.fertilizacion);
    console.log("producto" + form.value.producto);
    console.log("dosis" + form.value.dosis);
    console.log("mezcla_total" + form.value.mezcla_total);
    console.log("total_dosis" + form.value.total_dosis);
    console.log("elaborado" + form.value.elaborado);
    console.log("fecha_aplicacion" + form.value.fecha_aplicacion);
    console.log("ejecucion" + form.value.ejecucion);
    console.log("calidad_ejecucion" + form.value.calidad_ejecucion);
  }

}
