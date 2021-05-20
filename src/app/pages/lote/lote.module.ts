import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoteComponent } from './lote.component';
import { LotePageRoutingModule } from './lote-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LotePageRoutingModule
  ],
  declarations: [LoteComponent]
})
export class LotePageModule {}
