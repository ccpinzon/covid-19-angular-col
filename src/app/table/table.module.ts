import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import { TablePercentagesComponent } from './table-percentages/table-percentages.component';



@NgModule({
  declarations: [TableComponent, TablePercentagesComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule
  ]
})
export class TableModule { }
