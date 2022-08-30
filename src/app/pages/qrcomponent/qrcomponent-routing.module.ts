import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrcomponentComponent } from './qrcomponent.component';

const routes: Routes = [
  {
    path: '',
    component: QrcomponentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrcomponentPageRoutingModule {}
