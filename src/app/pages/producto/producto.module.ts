import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoComponent } from './producto.component';

import { ProductoPageRoutingModule } from './producto-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductoPageRoutingModule
  ],
  declarations: [ProductoComponent]
})
export class ProductoPageModule {}