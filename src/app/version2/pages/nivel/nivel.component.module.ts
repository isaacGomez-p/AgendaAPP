import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NivelComponent } from './nivel.component';

import { NivelComponentRoutingModule } from './nivel-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NivelComponentRoutingModule
  ],
  declarations: [NivelComponent]
})
export class NivelComponentModule {}
