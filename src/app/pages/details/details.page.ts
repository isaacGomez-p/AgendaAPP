import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
const { PushNotifications } = Plugins;
 
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  
  id: string = null;
 
  constructor(private route: ActivatedRoute,
    private toastController: ToastController) { }
 
  ngOnInit() {    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.toastConfirmacion(JSON.stringify(params), "success")
    });
  }
 
  resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
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
