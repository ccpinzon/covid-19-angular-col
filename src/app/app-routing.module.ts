import { NgModule } from '@angular/core';
import { Routes, RouterModule , PreloadAllModules} from '@angular/router';
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
  },
  {
    path: 'mapa-colombia',
    loadChildren: () => import('./mapa-colombia/mapa-colombia.module').then(m => m.MapaColombiaModule)
  }, {
    path: 'autoevaluacion',
    loadChildren: () => import('./self-assessment/self-assessment.module').then(m => m.SelfAssessmentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
