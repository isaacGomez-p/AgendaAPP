import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private router: Router) {}

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
            this.router.navigateByUrl('/finca');              
          }
        },
        {          
          text: 'Ver todas las ',
          role: 'selected',
          icon: 'layers-outline',
          handler: () => {
            this.router.navigateByUrl('/verFinca');              
          }
        }
      ]
    });
    await alert.present();
  }
  

}
