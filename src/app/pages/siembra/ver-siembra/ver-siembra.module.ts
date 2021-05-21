import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerSiembraComponent } from './ver-siembra.component';

import { VerSiembraPageRoutingModule } from './ver-siembra-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VerSiembraPageRoutingModule
  ],
  declarations: [VerSiembraComponent]
})
export class VerSiembraPageModule {}
