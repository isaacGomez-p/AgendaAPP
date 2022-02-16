import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarComponent } from './agregar/agregar.component';

@Component({
  selector: 'app-grupo-productor',
  templateUrl: './grupo-productor.component.html',
  styleUrls: ['./grupo-productor.component.scss'],
})
export class GrupoProductorComponent implements OnInit {

  grupoProductor: any = [
    {
      nombre: "NOMBRE"
    }
  ]

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log("hola")
  }

  ionViewDidEnter() {
    //console.log("volvió")
  }

  async nuevoGrupo() {
    const modal = await this.modalController.create({
      component: AgregarComponent,
      swipeToClose: true,      
      componentProps: {
        'data': 'noidea',
      },
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then((asd)=>{
      this.cargarGrupos()
    })
    
    return await modal.present();
  }  

  cargarGrupos(){
    let gruposProductores = JSON.parse(localStorage.getItem("gruposProductores"))
    this.grupoProductor = [];
    this.grupoProductor = gruposProductores;
  }

  verPlanillas(data){

  }

}
