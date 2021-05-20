import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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

}
