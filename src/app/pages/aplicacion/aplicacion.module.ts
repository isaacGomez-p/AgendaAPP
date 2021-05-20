import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AplicacionPage } from './aplicacion.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { AplicacionPageRoutingModule } from './aplicacion-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AplicacionPageRoutingModule
  ],
  declarations: [AplicacionPage]
})
export class AplicacionPageModule {}
