import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ChartModule} from './chart/chart.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {InfoBoxesModule} from './info-boxes/info-boxes.module';
import {TableModule} from './table/table.module';
import { HomeComponent } from './home/home.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import {MapaColombiaModule} from './mapa-colombia/mapa-colombia.module';
import {environment} from '../environments/environment.prod';
import {MaterialModule} from './modal/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PlaceModalComponent } from './modal/place-modal/place-modal.component';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaceModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    SharedModule,
    LeafletModule.forRoot(),
    InfoBoxesModule,
    TableModule,
    MapaColombiaModule,
    NgxMapboxGLModule.withConfig({ accessToken: environment.accessToken}),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlaceModalComponent]
})
export class AppModule { }
