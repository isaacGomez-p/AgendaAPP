import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FincaComponent } from './pages/finca/finca.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  tituloFinca: String = '';

  constructor(private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private router: Router, private finca: FincaComponent) {}

  ngOnInit() {  
    
  }

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
            this.router.navigateByUrl('/finca/Agregar una finca');
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

  async menuPlanilla() {
    const alert = await this.actionSheetCtrl.create({
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
    await alert.present();
  }

  menuProductos(){
    this.router.navigateByUrl('/producto');
  }
}