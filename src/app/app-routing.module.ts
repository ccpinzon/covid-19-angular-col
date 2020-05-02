import { NgModule } from '@angular/core';
import { Routes, RouterModule , PreloadAllModules} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CountryMobileComponent} from './country-mobile/country-mobile.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./colombia/colombia.module').then(m => m.ColombiaModule)
  },
  {
    path: 'countries',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'countrymobile/:countryName',
    pathMatch: 'full',
    component: CountryMobileComponent
  },
  {
    path: 'informacion',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
  },
  // {
  //   path: 'colombia',
  //   loadChildren: () => import('./colombia/colombia.module').then(m => m.ColombiaModule)
  // },
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
