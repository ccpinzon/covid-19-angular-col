import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import { TablePercentagesComponent } from './table-percentages/table-percentages.component';
import { TablePlacesComponent } from './table-places/table-places.component';



@NgModule({
  declarations: [TableComponent, TablePercentagesComponent, TablePlacesComponent],
  exports: [TableComponent, TablePlacesComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule
  ]
})
export class TableModule { }
