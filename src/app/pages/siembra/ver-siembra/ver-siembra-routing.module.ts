import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerSiembraComponent } from './ver-siembra.component';

const routes: Routes = [
  {
    path: '',
    component: VerSiembraComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerSiembraPageRoutingModule {}
