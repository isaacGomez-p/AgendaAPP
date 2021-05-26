import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerPlanillaComponent } from './ver-planilla.component';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { VerPlanillaPageRoutingModule } from './ver-planilla-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    VerPlanillaPageRoutingModule
  ],
  declarations: [VerPlanillaComponent]
})
export class VerAplicacionPageModule {}
