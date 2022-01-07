import { ActionSheetController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tituloFinca: String = '';
  countrycode: string = "57";
  whatsappnumber: string = "3046818117";
  url: string = "https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=hi";

  constructor(private actionSheetCtrl: ActionSheetController, 
    private router: Router, private toastController: ToastController) { }

  ngOnInit() {}

  async menuFinca() {
    const alert = await this.actionSheetCtrl.create({
      header: 'Finca',
      buttons: [
        {
          text: 'Agregar una finca',
          role: 'selected',
          icon: 'add-outline',
          handler: () => {
            this.tituloFinca = "Agregar una finca";
            //this.finca.setTitulo("Agregar una finca")            
            this.router.navigateByUrl('/finca/Agregar una finca/0');
          }
        },
        {
          text: 'Ver todas las fincas',
          role: 'selected',
          icon: 'layers-outline',
          handler: () => {                        
            this.router.navigateByUrl('/verFinca');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }
 
  async menuSiembra() {
    const alert = await this.actionSheetCtrl.create({
      header: 'Siembra',
      buttons: [
        {
          text: 'Agregar siembra',
          role: 'selected',
          icon: 'add-outline',
          handler: () => {
            window.localStorage.removeItem("buscarSiembraFinca")
            this.router.navigateByUrl('/siembra');
          }
        },        
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  //async menuPlanilla() {
  menuPlanilla() {
    this.router.navigateByUrl('/verPlanilla');
    /*const alert = await this.actionSheetCtrl.create({
      header: 'Aplicación',
      buttons: [
        {
          text: 'Ver planilla',
          role: 'selected',
          icon: 'layers-outline',
          handler: () => {
            this.router.navigateByUrl('/verPlanilla');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();*/
  }

  menuProductos(){
    this.router.navigateByUrl('/producto');
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

}
