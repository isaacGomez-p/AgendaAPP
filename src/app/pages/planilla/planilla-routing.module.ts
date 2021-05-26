import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanillaPage } from './planilla.page';

const routes: Routes = [
  {
    path: '',
    component: PlanillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanillaPageRoutingModule {}
