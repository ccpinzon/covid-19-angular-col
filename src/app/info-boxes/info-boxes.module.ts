import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBoxesComponent } from './info-boxes.component';



@NgModule({
    declarations: [InfoBoxesComponent],
  exports: [
    InfoBoxesComponent,
    InfoBoxesComponent
  ],
    imports: [
        CommonModule
    ]
})
export class InfoBoxesModule { }
