import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBoxesComponent } from './info-boxes.component';
import {RouterModule} from '@angular/router';
import {InfoBoxesMobileComponent} from '../info-boxes-mobile/info-boxes-mobile.component';



@NgModule({
    declarations: [InfoBoxesComponent, InfoBoxesMobileComponent],
    exports: [
      InfoBoxesComponent,
      InfoBoxesMobileComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class InfoBoxesModule { }
