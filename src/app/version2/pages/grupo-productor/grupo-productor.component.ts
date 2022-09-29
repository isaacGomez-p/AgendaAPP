import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AgregarComponent } from './agregar/agregar.component';

@Component({
  selector: 'app-grupo-productor',
  templateUrl: './grupo-productor.component.html',
  styleUrls: ['./grupo-productor.component.scss'],
})
export class GrupoProductorComponent implements OnInit {

  nombreGrupo: string;

  grupoProductor: any = []

  constructor(public modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter GrupoProductorComponent")
    this.cargarDatosLS();    
  }

  cargarDatosLS(){
    this.grupoProductor = JSON.parse(window.localStorage.getItem("gruposProductores"))
  }

  async nuevoGrupo() {
    this.router.navigateByUrl('/agregarGrupoProductor');

    /*const modal = await this.modalController.create({
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
    
    return await modal.present();*/
  }  

  cargarGrupos(){
    let gruposProductores = JSON.parse(localStorage.getItem("gruposProductores"))
    this.grupoProductor = [];
    this.grupoProductor = gruposProductores;
  }

  verPredios(grupoProductor){
    window.localStorage.setItem("grupoProductorBuscar", JSON.stringify(grupoProductor))
    this.router.navigateByUrl('/predios');
  }

}
