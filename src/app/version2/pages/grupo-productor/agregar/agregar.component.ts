import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {

  // Data passed in by componentProps
  @Input() data: any;

  nombreGrupo: string ;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  guardar(){
    let gruposProductores = JSON.parse(localStorage.getItem("gruposProductores"))
    
    if(gruposProductores === null || gruposProductores === undefined){
      gruposProductores = []      
    }

    gruposProductores.push({
      nombre: this.nombreGrupo
    })
    localStorage.setItem("gruposProductores", JSON.stringify(gruposProductores))  
    
  }

}
