import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GrupoProductorComponent } from './grupo-productor.component';

import { GrupoProductorRoutingModule } from './grupo-productor-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GrupoProductorRoutingModule
  ],
  declarations: [GrupoProductorComponent]
})
export class GrupoProductorPageModule {}
