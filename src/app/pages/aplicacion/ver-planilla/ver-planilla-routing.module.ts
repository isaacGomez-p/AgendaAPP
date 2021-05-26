import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerPlanillaComponent } from './ver-planilla.component';

const routes: Routes = [
  {
    path: '',
    component: VerPlanillaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerPlanillaPageRoutingModule {}
