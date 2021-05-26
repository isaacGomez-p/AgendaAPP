import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanillasComponent } from './planillas.component';
import { ExploreContainerComponentModule } from '../../../../explore-container/explore-container.module';

import { PlanillasPageRoutingModule } from './planillas-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PlanillasPageRoutingModule
  ],
  declarations: [PlanillasComponent]
})
export class PlanillasPageModule {}
