import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerFincaComponent } from './ver-finca.component';
import { VerFincaPageRoutingModule } from './ver-finca-routing.module';
import { FincaComponent } from '../finca.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerFincaPageRoutingModule,
  ],
  declarations: [VerFincaComponent,
    FincaComponent]
})
export class VerFincaPageModule {}
