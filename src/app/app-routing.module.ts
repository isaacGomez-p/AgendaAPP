import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'finca/:titulo',
    loadChildren: () => import('./pages/finca/finca.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'verFinca',
    loadChildren: () => import('./pages/finca/ver-finca/ver-finca.module').then( m => m.VerFincaPageModule)
  },
  {
    path: 'siembra',
    loadChildren: () => import('./pages/siembra/siembra.module').then( m => m.SiembraPageModule)
  },  
  {
    path: 'verSiembra',
    loadChildren: () => import('./pages/siembra/ver-siembra/ver-siembra.module').then( m => m.VerSiembraPageModule)
  },  
  {
    path: 'aplicacion',
    loadChildren: () => import('./pages/aplicacion/aplicacion.module').then( m => m.AplicacionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
