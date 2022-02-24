import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PredioComponent } from './predio.component';

import { PredioComponentRoutingModule } from './predio-component-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PredioComponentRoutingModule
  ],
  declarations: [PredioComponent]
})
export class PredioComponentModule {}
