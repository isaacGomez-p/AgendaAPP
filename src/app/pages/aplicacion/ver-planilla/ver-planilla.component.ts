import { NumeroPlanilla } from './../../../model/numeroPlanilla';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PlanillaService } from 'src/app/services/planilla.service';
import { ActionSheetController } from '@ionic/angular';
import { Planilla } from 'src/app/model/planilla';


@Component({
  selector: 'app-ver-planilla',
  templateUrl: './ver-planilla.component.html',
  styleUrls: ['./ver-planilla.component.scss'],
})
export class VerPlanillaComponent implements OnInit {

  planillas: NumeroPlanilla[];

  duracionRefresh: number = 2000;

  constructor(private toastController: ToastController, private loadingController: LoadingController, private router: Router, private servicePlanilla: PlanillaService, private alertController: AlertController, public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {        
    this.cargarPlanillasLS();
  }

  async presentModal(planilla: Planilla) {
    const alert = await this.actionSheetCtrl.create({
      header: 'Acciones',
      buttons: [
        {
          text: 'Editar',
          role: 'selected',
          icon: 'pencil-outline',
          handler: () => {
            //this.openAlert(pedido);
          }
        },{
          text: 'Eliminar',
          role: 'selected',
          icon: 'close-outline',
          handler: () => {
            //this.pedidoCanceladoAlert(pedido)
          }
        },{
          text: 'Ruta',
          role: 'destructive',
          icon: 'navigate-circle-outline',
          handler: () => {
            //this.ruta(pedido);
          }
        }
      ]
    });
    await alert.present();
    /*
    window.localStorage.setItem( "pedido_actualizar", JSON.stringify(pedido));
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();*/
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

  async nuevaPlanilla() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',      
      message: '<strong>Desea crear una nueva planilla</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.registrar();
          }
        }
      ]
    });
    await alert.present();
  }

  registrar(){
    let datos = new NumeroPlanilla();
    datos = {
      agricultor_id: 1,
      fecha_creacion: new Date(),
      n_planilla_id: 0
    }
    this.servicePlanilla.postNumeroPlanilla(datos).subscribe(() =>{
      this.toastConfirmacion("Se registro correctamente", "success");
    })
  }

}
