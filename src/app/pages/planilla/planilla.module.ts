import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanillaPageRoutingModule } from './planilla-routing.module';

import { PlanillaPage } from './planilla.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanillaPageRoutingModule
  ],
  declarations: [PlanillaPage]
})
export class PlanillaPageModule {}
