import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaFincas = [ "Finca1", "Finca2", "Finca3" ];

  constructor() {}

}
