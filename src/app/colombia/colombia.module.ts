import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColombiaRoutingModule } from './colombia-routing.module';
import { ColombiaComponent } from './colombia.component';
import {ChartModule} from '../chart/chart.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {InfoBoxesModule} from '../info-boxes/info-boxes.module';
import {TableModule} from "../table/table.module";


@NgModule({
  declarations: [ColombiaComponent],
  imports: [
    CommonModule,
    ColombiaRoutingModule,
    ChartModule,
    ScrollingModule,
    InfoBoxesModule,
    TableModule
  ],
  schemas: [
   ChartModule
  ]
})
export class ColombiaModule { }
