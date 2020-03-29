import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ChartModule} from './chart/chart.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TableComponent } from './table/table.component';
import {InfoBoxesModule} from './info-boxes/info-boxes.module';
import {TableModule} from './table/table.module';
import { HomeComponent } from './home/home.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import {MapaColombiaModule} from './mapa-colombia/mapa-colombia.module';
import {environment} from '../environments/environment.prod';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    LeafletModule.forRoot(),
    InfoBoxesModule,
    TableModule,
    MapaColombiaModule,
    NgxMapboxGLModule.withConfig({ accessToken: environment.accessToken})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
