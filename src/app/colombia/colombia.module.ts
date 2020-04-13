import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColombiaRoutingModule } from './colombia-routing.module';
import { ColombiaComponent } from './colombia.component';
import {ChartModule} from '../chart/chart.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {InfoBoxesModule} from '../info-boxes/info-boxes.module';


@NgModule({
  declarations: [ColombiaComponent],
  imports: [
    CommonModule,
    ColombiaRoutingModule,
    ChartModule,
    ScrollingModule,
    InfoBoxesModule
  ],
  schemas: [
   ChartModule
  ]
})
export class ColombiaModule { }
