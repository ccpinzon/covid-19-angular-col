import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBoxesComponent } from './info-boxes.component';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [InfoBoxesComponent],
  exports: [
    InfoBoxesComponent,
    InfoBoxesComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class InfoBoxesModule { }
