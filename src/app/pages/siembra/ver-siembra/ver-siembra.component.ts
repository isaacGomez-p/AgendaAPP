import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Siembra } from 'src/app/model/siembra';
import { SiembraService } from 'src/app/services/siembra.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ver-siembra',
  templateUrl: './ver-siembra.component.html',
  styleUrls: ['./ver-siembra.component.scss'],
})
export class VerSiembraComponent implements OnInit {

  duracionRefresh: number = 2000;

  siembras: Siembra[];

  enableBackdropDismiss = false;
  showBackdrop = true;
  shouldPropagate = false;

  constructor(private serviceSiembra: SiembraService,private loadingController: LoadingController, public alertController: AlertController, private router: Router, private toastController: ToastController) { }  

  ngOnInit() {
    this.cargarSiembras();
  }

  ionViewDidEnter(){
    this.cargarSiembras();
  }

  cargarSiembrasService(id: number){
    this.serviceSiembra.getSiembrasFinca(id).subscribe((data) =>{
      if(data.length > 0){
        this.siembras = data;
        this.toastConfirmacion("Siembras registradas", "success")
      }else{
        this.siembras = [];
        this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")
      }
    })
  }

  cargarSiembras(){
    if(JSON.parse(window.localStorage.getItem("buscarSiembraFinca")) === null){
      this.router.navigateByUrl('/verFinca');
    }else{
      this.cargarSiembrasService(JSON.parse(window.localStorage.getItem("buscarSiembraFinca")));
    }    
  }

  doRefresh(event) {    
    this.cargarSiembras();
    this.presentLoading();
    setTimeout(() => {  
      event.target.complete();
    }, this.duracionRefresh);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espera...',
      duration: this.duracionRefresh
    });
    await loading.present();    
  }

  async masInfo(siembra) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Detalles',      
      message: '<strong>Variedad: </strong> ' + siembra.variedad + '<br><strong>Plantas: </strong>' +siembra.plantas +'<br><strong>Año: </strong>' + siembra.anio + '<br><strong>Semana: </strong>' + siembra.semana + '<br><strong>Día: </strong>' + siembra.dia,
      buttons: [
        /*{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },*/ {
          text: 'Cerrar',
          handler: () => {
            
          }
        }
      ]
    });
    await alert.present();
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  agregarSiembra(){
    this.router.navigateByUrl('/siembra');
  }

}
