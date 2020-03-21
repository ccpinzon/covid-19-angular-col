import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table.component';
import {ScrollingModule} from '@angular/cdk/scrolling';



@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    ScrollingModule
  ]
})
export class TableModule { }
