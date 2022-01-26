import { UserEntity } from '../../../model/userEntity';
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

  agricultor: UserEntity;

  planillas: NumeroPlanilla[];  
  duracionRefresh: number = 2000;

  constructor(private toastController: ToastController, private loadingController: LoadingController, private router: Router, private servicePlanilla: PlanillaService, private alertController: AlertController, public actionSheetCtrl: ActionSheetController) { }

  OnViewDidEnter(){    
    this.cargarPlanillasLS();
  }

  ngOnInit() {            
    this.cargarPlanillasLS();
  }

  async presentModal(planilla) {
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
    console.log("Cargando planillas")
    if(JSON.parse(window.localStorage.getItem("numeroPlanillas")) === null || JSON.parse(window.localStorage.getItem("numeroPlanillas")).length === 0){
      this.toastConfirmacion('No tiene planillas registradas.', 'warning');
      this.planillas =  JSON.parse(window.localStorage.getItem("numeroPlanillas"));
    }else{                   
      this.planillas =  JSON.parse(window.localStorage.getItem("numeroPlanillas"));      
      /*this.planillas.map((item)=>{
        if(item.n_planilla_id !== parseInt(window.localStorage.getItem('buscarPlanilla'))){
          this.planillas = [];
        }
      });*/
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
    //this.cargarPlanillasBD();
    this.cargarPlanillasLS();
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
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'))
    
    let datos = new NumeroPlanilla();
    let cont = 0;
    if(this.planillas == null){
      this.toastConfirmacion("Por favor verifique que haya sincronizado.", "warning");      
    }else{      
      this.planillas.map((item)=>{
        if(item.nSpreadsheetId <= 0){
          cont++;
        }
      })
      datos = {
        user: this.agricultor,
        creationDate: new Date(),
        nSpreadsheetId: cont*-1,
        agregar: false,
        code: this.generaCodigo()
      }
      this.planillas.push(datos)
      window.localStorage.setItem("numeroPlanillas", JSON.stringify(this.planillas));
      /*this.servicePlanilla.postNumeroPlanilla(datos).subscribe(() =>{
        this.toastConfirmacion("Se registro correctamente", "success");
      })*/
      this.toastConfirmacion("Se registro correctamente", "success");
    }
  }

  generaCodigo(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+ABCDEFGHIJKLMNOPQRSTUVXYZ';    
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

}
