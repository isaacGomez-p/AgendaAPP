import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiembraPage } from './siembra.page';

import { SiembraPageRoutingModule } from './siembra-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SiembraPageRoutingModule
  ],
  declarations: [SiembraPage]
})
export class SiembraPageModule {}
