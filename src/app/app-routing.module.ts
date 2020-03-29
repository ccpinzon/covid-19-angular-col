import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'informacion',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
  },
  {
    path: 'mapa-colombia',
    loadChildren: () => import('./mapa-colombia/mapa-colombia.module').then(m => m.MapaColombiaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
