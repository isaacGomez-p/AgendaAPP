import { NumeroPlanilla } from './../../../model/numeroPlanilla';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PlanillaService } from 'src/app/services/planilla.service';


@Component({
  selector: 'app-ver-planilla',
  templateUrl: './ver-planilla.component.html',
  styleUrls: ['./ver-planilla.component.scss'],
})
export class VerPlanillaComponent implements OnInit {

  planillas: NumeroPlanilla[];

  duracionRefresh: number = 2000;

  constructor(private toastController: ToastController, private loadingController: LoadingController, private router: Router, private servicePlanilla: PlanillaService) { }

  ngOnInit() {        
    this.cargarPlanillasLS();
  }

  verPlanillas(id){
    window.localStorage.setItem('buscarPlanilla', id);
    this.router.navigateByUrl('/planillas');
  }

  cargarPlanillasLS(){
    if(JSON.parse(window.localStorage.getItem("numeroPlanillas")) === null || JSON.parse(window.localStorage.getItem("numeroPlanillas")).length === 0){
      this.toastConfirmacion('No tiene planillas registradas. Por favor actualice la pagina.', 'warning');
    }else{
      this.planillas =  JSON.parse(window.localStorage.getItem("numeroPlanillas"));
    }    
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {    
    window.localStorage.removeItem("buscarPlanilla")
    this.cargarPlanillasBD();
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

  cargarPlanillasBD(){
    this.servicePlanilla.getNumerosPlanillas(1).subscribe((data) => {
      if(data.length === 0){
        this.toastConfirmacion('No se encontraron datos registrados.', 'warning');
      }else{
        this.planillas = data;
        window.localStorage.setItem("numeroPlanillas", JSON.stringify(data));
      }      
    })
  }  

  /*async nuevaPlanilla() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }*/

}
