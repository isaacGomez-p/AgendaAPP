import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarComponent } from './agregar.component';
import { AgregarComponentRoutingModule } from './agregar.component-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    AgregarComponentRoutingModule
  ],
  declarations: [AgregarComponent]
})
export class AgregarComponentModule {}
