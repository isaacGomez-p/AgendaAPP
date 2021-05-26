import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanillasComponent } from './planillas.component';

const routes: Routes = [
  {
    path: '',
    component: PlanillasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanillasPageRoutingModule {}
