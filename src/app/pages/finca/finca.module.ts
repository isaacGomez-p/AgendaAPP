import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FincaComponent } from './finca.component';
import { FincaPageRoutingModule } from './finca-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FincaPageRoutingModule
  ],
  declarations: [FincaComponent]
})
export class CamaraPageModule {}
