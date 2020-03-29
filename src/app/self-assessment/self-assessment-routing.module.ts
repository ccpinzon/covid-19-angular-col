import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SelfAssessmentComponent} from './self-assessment.component';


const routes: Routes = [{path: '', component: SelfAssessmentComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfAssessmentRoutingModule { }
