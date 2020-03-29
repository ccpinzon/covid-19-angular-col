import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapaColombiaComponent} from './mapa-colombia.component';


const routes: Routes = [{path: '', component: MapaColombiaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaColombiaRoutingModule { }
