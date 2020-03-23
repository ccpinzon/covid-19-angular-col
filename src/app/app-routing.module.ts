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
    path: 'colombia',
    loadChildren: () => import('./colombia/colombia.module').then(m => m.ColombiaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
