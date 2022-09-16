import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrcomponentComponent } from './qrcomponent.component';
//import { NgxQRCodeModule } from 'ngx-qrcode2';

import { QrcomponentPageRoutingModule } from './qrcomponent-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QrcomponentPageRoutingModule,
   // NgxQRCodeModule
  ],
  declarations: [QrcomponentComponent]
})
export class QrComponentModule {}