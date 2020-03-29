import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapaColombiaComponent} from './mapa-colombia.component';
import {MapaColombiaRoutingModule} from './mapa-colombia-routing.module';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';

@NgModule({
  declarations: [MapaColombiaComponent],
  exports: [
    MapaColombiaComponent
  ],
  imports: [
    CommonModule,
    MapaColombiaRoutingModule,
    NgxMapboxGLModule,
  ]
})
export class MapaColombiaModule { }
