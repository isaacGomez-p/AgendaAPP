import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelComponent } from './nivel.component';

const routes: Routes = [
  {
    path: '',
    component: NivelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NivelComponentRoutingModule {}
