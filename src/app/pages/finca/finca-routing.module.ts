import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FincaComponent } from './finca.component';

const routes: Routes = [
  {
    path: '',
    component: FincaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FincaPageRoutingModule {}
