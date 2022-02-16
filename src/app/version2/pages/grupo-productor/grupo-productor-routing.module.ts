import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupoProductorComponent } from './grupo-productor.component';

const routes: Routes = [
  {
    path: '',
    component: GrupoProductorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoProductorRoutingModule {}
