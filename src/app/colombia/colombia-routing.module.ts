import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColombiaComponent } from './colombia.component';


const routes: Routes = [{path: '', component: ColombiaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColombiaRoutingModule { }
