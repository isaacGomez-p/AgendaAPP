import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiembraPage } from './siembra.page';

const routes: Routes = [
  {
    path: '',
    component: SiembraPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiembraPageRoutingModule {}
