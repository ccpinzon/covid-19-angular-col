import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfAssessmentRoutingModule } from './self-assessment-routing.module';
import { SelfAssessmentComponent } from './self-assessment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SelfAssessmentComponent],
  imports: [
    CommonModule,
    SelfAssessmentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SelfAssessmentModule { }
